import { initStoreState } from 'configs/initState';
import { SOCKET_NEW_MESSAGE, SOCKET_UPDATE_THREAD, SOCKET_UPDATE_CHANNEL } from './actions';
import { unionArray } from 'shared/utils';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case SOCKET_NEW_MESSAGE: {
      const { result, entities } = action.norm;
      const addMessage = entities.messages[result];
      const parentMessage = addMessage.parentId ? state.entities.messages[addMessage.parentId] : null;
      const nextMessages = addMessage.parentId ? state.messages : unionArray([result, ...state.messages]);
      const nextEntitiesMessages = {
        ...state.entities.messages,
        // Should not add entity if is 2LV message and store doesn't have the parent
        ...(!addMessage.parentId || !parentMessage ? entities.messages : null),
        // Check if we should update Parent Message entity in store
        ...(parentMessage
          ? parentMessage.replies
            ? {
                [addMessage.parentId]: {
                  ...parentMessage.replies, // Keep the next cursor if has any
                  count: parentMessage.replies.count + 1,
                  data: [result, ...parentMessage.replies.data],
                },
              }
            : {
                [addMessage.parentId]: {
                  count: 1,
                  data: [result],
                },
              }
          : null),
      };
      return {
        ...state,
        messages: nextMessages,
        pendingMessages: state.pendingMessages.filter((item) => item.messageId !== result),
        entities: {
          ...state.entities,
          messages: {
            ...nextEntitiesMessages,
          },
          customers: {
            ...state.entities.customers,
            ...entities.customers,
          },
          users: {
            ...state.entities.users,
            ...entities.users,
          },
        },
      };
    }
    case SOCKET_UPDATE_THREAD: {
      const { result, entities } = action.norm;
      return {
        ...state,
        totalThreadsCount: state.threads.includes(result) ? state.totalThreadsCount : state.totalThreadsCount + 1,
        threads: unionArray([...state.threads, result]),
        entities: {
          ...state.entities,
          threads: {
            ...state.entities.threads,
            ...entities.threads,
          },
        },
      };
    }
    case SOCKET_UPDATE_CHANNEL:
      return {
        ...state,
        entities: {
          ...state.entities,
          channels: {
            ...state.entities.channels,
            [action.channel.id]: {
              ...state.entities.channels[action.channel.id],
              missCount: state.entities.channels[action.channel.id].missCount + action.channel.missCountChange,
            },
          },
        },
      };

    default:
      return state;
  }
};
