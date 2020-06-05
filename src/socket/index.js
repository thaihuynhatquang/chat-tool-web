import { toast } from 'react-toastify';
import {
  SOCKET_NEW_MESSAGE as NEW_MESSAGE_EVENT,
  SOCKET_UPDATE_THREAD as UPDATE_THREAD_EVENT,
  SOCKET_TRANSFER_THREAD as TRANSFER_THREAD_EVENT,
  SOCKET_UPDATE_CUSTOMER_PHONE as UPDATE_CUSTOMER_PHONE_EVENT,
  SOCKET_REFRESH_CHANNEL,
  PERMISSION_READ_ALL_THREADS,
  THREAD_STATUS_UNREAD,
  THREAD_STATUS_PROCESSING,
  PERMISSION_READ_HIDDEN_MESSAGES,
} from 'shared/constants';
import {
  SOCKET_NEW_MESSAGE,
  SOCKET_UPDATE_THREAD,
  SOCKET_UPDATE_CHANNEL,
  SOCKET_UPDATE_THREAD_HEADER,
  SOCKET_UPDATE_CUSTOMER,
  ADD_TRANSFER_THREAD,
} from './actions';
import { normalize } from 'normalizr';
import { thread as threadModel, message as messageModel, customer as customerModel } from 'configs/normalizr';
import * as storeGetter from 'shared/getEntities';
import { canDo } from 'shared/utils';

const ALERT_SOUND = '/alert-sound.mp3';

const includeMe = (usersServing, me) => usersServing.some((user) => user.id === me.id);

const isProcessing = (filterThreadsBy) => filterThreadsBy.status === THREAD_STATUS_PROCESSING;

const shouldUpdateThread = (me, channel, thread, filterThreadsBy) => {
  const { usersServing, updatedFields } = thread;

  // channel is broadcast
  if (channel.configs && channel.configs.isBroadcast) return true;

  // last message
  if (!updatedFields.includes('status')) return true;

  if (canDo(me, channel.id, PERMISSION_READ_ALL_THREADS)) return true;

  // update status
  if (updatedFields.includes('status')) {
    if (thread.status !== THREAD_STATUS_PROCESSING) return true;

    if ((thread.status === THREAD_STATUS_PROCESSING && includeMe(usersServing, me)) || !isProcessing(filterThreadsBy)) {
      return true;
    }
  }
  return false;
};

const shouldUpdateThreadHeader = (me, channel, thread) => {
  const { referentData, updatedFields, usersServing } = thread;
  if (!updatedFields.includes('status')) return false;

  if (parseInt(referentData.channelId) !== parseInt(channel.id)) return false;

  if (canDo(me, channel.id, PERMISSION_READ_ALL_THREADS)) return true;
  // channel is broadcast
  if (channel.configs && channel.configs.isBroadcast) return true;

  if (updatedFields.includes('status')) {
    if (referentData.nStatus !== THREAD_STATUS_PROCESSING) return true;

    if (referentData.nStatus === THREAD_STATUS_PROCESSING && includeMe(usersServing, me)) {
      return true;
    }
  }
  return false;
};

const shouldUpdateChannelMissCount = (me, channel, thread) => {
  const canReadAllThreads =
    canDo(me, channel.id, PERMISSION_READ_ALL_THREADS) || (channel.configs && channel.configs.isBroadcast);
  if (canReadAllThreads) return true;
  return thread.status !== THREAD_STATUS_UNREAD;
};

const manageNotificationOfChannel = (storeState, message) => {
  const channel = storeGetter.getChannelById(storeState, message.customer.channelId);
  if (message && channel && !message.userId) {
    const channelUserConfigs = channel['ChannelUser.configs'];
    if (channelUserConfigs === null || channelUserConfigs.receiveNotification !== false) {
      // $FlowFixMe
      const sound = new Audio(ALERT_SOUND);
      sound.play();
    }
  }
};

const socketHandler = (socket) => (store) => {
  const socketEventHandler = ({ message, thread, channel, customer }) => {
    const channelId = thread ? thread.channelId : channel ? channel.id : null;
    const storeState = store.getState();
    const me = storeGetter.getMe(storeState);
    const selectedChannel = storeGetter.getSelectedChannel(storeState);
    const filterThreadsBy = storeGetter.getFilterThreadsBy(storeState);
    const canReadHiddenMessage = canDo(me, channelId, PERMISSION_READ_HIDDEN_MESSAGES);

    const shouldEmitMessage = message && (!message.hidden || canReadHiddenMessage);

    const shouldEmitThread =
      me && selectedChannel && thread && shouldUpdateThread(me, selectedChannel, thread, filterThreadsBy);

    const shouldEmitThreadHeader =
      me && selectedChannel && thread && shouldUpdateThreadHeader(me, selectedChannel, thread);

    message &&
      shouldEmitMessage &&
      store.dispatch({
        type: SOCKET_NEW_MESSAGE,
        data: message,
        norm: normalize(message, messageModel),
      }) &&
      manageNotificationOfChannel(storeState, message);

    shouldEmitThread &&
      store.dispatch({
        type: SOCKET_UPDATE_THREAD,
        data: thread,
        norm: normalize(thread, threadModel),
      });

    channel &&
      me &&
      thread &&
      shouldUpdateChannelMissCount(me, channel, thread) &&
      store.dispatch({
        type: SOCKET_UPDATE_CHANNEL,
        channel,
      });

    shouldEmitThreadHeader &&
      store.dispatch({
        type: SOCKET_UPDATE_THREAD_HEADER,
        referentData: thread.referentData,
      });

    customer &&
      store.dispatch({
        type: SOCKET_UPDATE_CUSTOMER,
        data: customer,
        norm: normalize(customer, customerModel),
      });
  };

  socket.on(NEW_MESSAGE_EVENT, socketEventHandler);
  socket.on(UPDATE_THREAD_EVENT, socketEventHandler);
  socket.on(UPDATE_CUSTOMER_PHONE_EVENT, socketEventHandler);
  socket.on(TRANSFER_THREAD_EVENT, (receiveTransferThread) => {
    store.dispatch({
      type: ADD_TRANSFER_THREAD,
      receiveTransferThread,
    });
  });
  socket.on(SOCKET_REFRESH_CHANNEL, () => {
    toast.info('Hệ thống sẽ tự tải lại sau 10s');
    setTimeout(() => {
      window.location.reload();
    }, 10000);
  });
};

export default socketHandler;
