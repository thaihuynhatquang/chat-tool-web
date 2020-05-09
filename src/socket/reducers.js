import { initStoreState } from 'configs/initState';
import { SOCKET_NEW_MESSAGE, SOCKET_UPDATE_THREAD, SOCKET_UPDATE_CHANNEL } from './actions';
import { unionArray } from 'shared/utils';

export const messagesInSocket = (state = initStoreState.messages, action) => {
  switch (action.type) {
    case SOCKET_NEW_MESSAGE:
      return {
        ...state,
        items: unionArray([action.norm.result, ...state.items]),
        itemsById: {
          ...state.itemsById,
          ...action.norm.entities.messages,
        },
      };
    default:
      return state;
  }
};
export const threadsInSocket = (state, action) => {
  switch (action.type) {
    case SOCKET_UPDATE_THREAD: {
      const { result, entities } = action.norm;
      const newThread = entities.threads[result];
      return {
        ...state,
        totalCount: state.items.includes(newThread.id) ? state.totalCount : state.totalCount + 1,
        items: unionArray([...state.items, result]),
        itemsById: {
          ...state.itemsById,
          [result]: newThread,
        },
        thread: state.thread && state.thread.id === result ? newThread : state.thread,
      };
    }
    default:
      return state;
  }
};
export const channelsInSocket = (state, action) => {
  switch (action.type) {
    case SOCKET_UPDATE_CHANNEL:
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [action.channel.id]: {
            ...state.itemsById[action.channel.id],
            missCount: state.itemsById[action.channel.id].missCount + action.channel.missCountChange,
          },
        },
      };

    default:
      return state;
  }
};

export const pendingMessagesInSocket = (state, action) => {
  switch (action.type) {
    case SOCKET_NEW_MESSAGE: {
      const nextItemsById = Object.keys(state.itemsById).reduce(
        (acc, val) =>
          action.norm.result === state.itemsById[val].messageId ? acc : { ...acc, [val]: state.itemsById[val] },
        {},
      );
      const nextItems = Object.keys(nextItemsById);
      return {
        items: nextItems,
        itemsById: nextItemsById,
      };
    }
    default:
      return state;
  }
};
