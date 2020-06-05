import { PERMISSION_READ_HIDDEN_MESSAGES } from 'shared/constants';
import { canDo } from 'shared/utils';

export const getMe = (state) => (state.userId ? state.entities.users[state.userId] : null);

export const getChannels = (state) => state.channels.map((key) => state.entities.channels[key]);

export const getSelectedChannel = (state) => {
  const { selectedChannelId } = state;

  return selectedChannelId ? state.entities.channels[selectedChannelId] : undefined;
};

export const getThreads = (state) => {
  const threads = state.threads.map((key) => state.entities.threads[key]);
  const me = getMe(state);
  const canReadHiddenMessage = canDo(me, state.selectedChannelId, PERMISSION_READ_HIDDEN_MESSAGES);
  if (canReadHiddenMessage) return threads;
  return threads.map((thread) => ({
    ...thread,
    ...(thread.lastMessage && {
      lastMessage: {
        ...thread.lastMessage,
        ...(thread.lastMessage.hidden ? { content: '' } : undefined),
      },
    }),
  }));
};

export const getSelectedThread = (state) =>
  state.selectedThreadId ? state.entities.threads[state.selectedThreadId] : null;

export const getChannelById = (state, channelId) => (channelId ? state.entities.channels[channelId] : null);

export const getMessages = (state) =>
  state.messages.map((key) => {
    const message = state.entities.messages[key];
    // A little fix to make Flow understand that replies will be overrided
    const { replies: _, ...messageRest } = message;
    const customer = state.entities.customers[message.customerId];
    const user = message.userId ? state.entities.users[message.userId] : null;
    const replies = message.replies
      ? {
          count: message.replies.count,
          nextCursor: message.replies.nextCursor,
          data: message.replies.data.map((key) => {
            const reply = state.entities.messages[key];
            const customerReply = state.entities.customers[reply.customerId];
            const userReply = reply.userId ? state.entities.users[reply.userId] : null;

            return {
              ...state.entities.messages[key],
              customer: customerReply,
              user: userReply,
            };
          }),
        }
      : null;
    return {
      ...messageRest,
      customer,
      user,
      replies,
    };
  });

export const getCustomer = (state) => (state.customerId ? state.entities.customers[state.customerId] : null);

export const getChannelMessageLevel = (channel) => {
  if (!channel) return 1;
  if (['fbcomment'].includes(channel.type)) return 2;
  return 1;
};

export const getFilterThreadsBy = (state) => state.filterThreadsBy;

export const getQuickReplies = (state) => {
  return Object.values(state.entities.quickReplies) || [];
};

export const getQuickRepliesFetched = (state) => {
  return state.quickRepliesFetched;
};
