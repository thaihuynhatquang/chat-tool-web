import { initStoreState } from 'configs/initState';
import { SOCKET_NEW_MESSAGE, SOCKET_UPDATE_THREAD, SOCKET_UPDATE_CHANNEL } from './actions';
import { unionArray } from 'shared/utils';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case SOCKET_NEW_MESSAGE: {
      const { result, entities } = action.norm;
      return {
        ...state,
        messages: [result, ...state.messages],
        pendingMessages: state.pendingMessages.filter((item) => item.messageId !== result),
        entities: {
          ...state.entities,
          messages: {
            ...state.entities.messages,
            ...entities.messages,
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
