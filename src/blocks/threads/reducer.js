import { initStoreState } from 'configs/initState';
import { PERMISSION_READ_ALL_THREADS, THREAD_STATUS_PROCESSING } from 'shared/constants';
import * as storeGetter from 'shared/getEntities';
import { canDo, replaceVietnameseChar, unionArray } from 'shared/utils';
import { FETCH_MORE_THREADS_SUCCEED, FETCH_THREADS_SUCCEED, SELECT_THREAD } from './actions';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case FETCH_THREADS_SUCCEED: {
      const { result, entities } = action.norm;
      return {
        ...state,
        threads: result,
        entities: {
          ...state.entities,
          threads:
            !state.selectedThreadId || result.includes(state.selectedThreadId)
              ? entities.threads || {}
              : {
                  ...entities.threads,
                  [state.selectedThreadId]: state.entities.threads[state.selectedThreadId],
                },
        },
        totalThreadsCount: action.data.count,
      };
    }
    case FETCH_MORE_THREADS_SUCCEED: {
      const { result, entities } = action.norm;
      return {
        ...state,
        threads: unionArray([...state.threads, ...result]),
        entities: {
          ...state.entities,
          threads: {
            ...state.entities.threads,
            ...entities.threads,
          },
        },
        totalThreadsCount: action.data.count,
      };
    }
    case SELECT_THREAD: {
      const { [state.customerId || 0]: _omit, ...nextCustomersEntities } = state.entities.customers;
      return {
        ...state,
        selectedThreadId: action.id,
        messages: [],
        customerId: null,
        entities: {
          ...state.entities,
          customers: nextCustomersEntities,
        },
      };
    }
    default:
      return state;
  }
};

// Remove all current threads by filters. Requires update when filters logic changes.
export const threadsPostReducer = (state = initStoreState) => {
  const {
    userId,
    threads: items,
    entities: { threads: itemsById },
    filterThreadsBy: { title, status, isMiss, sort },
    selectedChannelId: channelId,
    selectedThreadId,
  } = state;
  const me = storeGetter.getMe(state);
  const channel = storeGetter.getChannelById(state, channelId);
  const filterItems = items
    .filter((id) => {
      const thread = itemsById[id];
      if (!thread) return false;
      if (thread.channelId !== channelId) return false;
      if (thread.status !== status) return false;
      if (
        status === THREAD_STATUS_PROCESSING &&
        channel &&
        channel.configs &&
        !channel.configs.isBroadcast &&
        !canDo(me, channelId, PERMISSION_READ_ALL_THREADS) &&
        thread.usersServing &&
        Array.isArray(thread.usersServing) &&
        !thread.usersServing.find((user) => user.id === userId)
      ) {
        return false;
      }
      if (
        title &&
        !replaceVietnameseChar(thread.title.toLowerCase()).includes(replaceVietnameseChar(title.toLowerCase()))
      ) {
        return false;
      }

      if (isMiss && thread.missCount === 0) return false;
      return true;
    })
    .sort((aKey, bKey) => {
      const aItem = itemsById[aKey];
      const bItem = itemsById[bKey];
      const compareFunction = () => {
        if (!aItem.lastMsgAt) return 1;
        if (!bItem.lastMsgAt) return -1;
        if (aItem.lastMsgAt > bItem.lastMsgAt) return -1;
        if (aItem.lastMsgAt < bItem.lastMsgAt) return 1;
        return 0;
      };
      if (!sort || sort === 'desc') return compareFunction();
      return -compareFunction();
    });
  const filterItemsById = filterItems.reduce(
    (acc, val) => ({ ...acc, [val]: itemsById[val] }),
    selectedThreadId && filterItems.includes(selectedThreadId)
      ? {}
      : // $FlowFixMe
        { [selectedThreadId]: itemsById[selectedThreadId] },
  );
  return {
    ...state,
    threads: filterItems,
    entities: {
      ...state.entities,
      threads: filterItemsById,
    },
    totalThreadsCount: state.totalThreadsCount - items.length + filterItems.length,
  };
};
