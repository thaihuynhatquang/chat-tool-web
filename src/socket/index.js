import {
  SOCKET_NEW_MESSAGE as NEW_MESSAGE_EVENT,
  SOCKET_UPDATE_THREAD_STATUS as UPDATE_THREAD_STATUS_EVENT,
} from 'common/constants';
import { SOCKET_NEW_MESSAGE, SOCKET_UPDATE_THREAD, SOCKET_UPDATE_CHANNEL } from './actions';
import { normalize } from 'normalizr';
import { thread as threadModel, message as messageModel } from 'configs/normalizr';

const socketHandler = (socket) => ({ dispatch }) => {
  socket.on(NEW_MESSAGE_EVENT, ({ message, thread, channel }) => {
    dispatch({
      type: SOCKET_NEW_MESSAGE,
      data: message,
      norm: normalize(message, messageModel),
    });
    dispatch({
      type: SOCKET_UPDATE_THREAD,
      data: thread,
      norm: normalize(thread, threadModel),
    });
    dispatch({
      type: SOCKET_UPDATE_CHANNEL,
      channel,
    });
  });

  socket.on(UPDATE_THREAD_STATUS_EVENT, ({ thread }) => {
    dispatch({
      type: SOCKET_UPDATE_THREAD,
      data: thread,
      norm: normalize(thread, threadModel),
    });
  });
};

export default socketHandler;
