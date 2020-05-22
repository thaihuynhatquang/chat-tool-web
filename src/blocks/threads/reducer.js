import { FETCH_THREADS_SUCCEED, FETCH_MORE_THREADS_SUCCEED, SELECT_THREAD } from './actions';
import { unionArray, replaceVietnameseChar } from 'shared/utils';
import { initStoreState } from 'configs/initState';

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
        totalCount: action.data.count,
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
    threads: items,
    entities: { threads: itemsById },
    filterThreadsBy: { title, status, isMiss, sort },
    selectedChannelId: channelId,
    selectedThreadId,
  } = state;
  const filterItems = items
    .filter((id) => {
      const thread = itemsById[id];
      if (!thread) return false;
      if (thread.channelId !== channelId) return false;
      if (thread.status !== status) return false;
      if (
        title &&
        !replaceVietnameseChar(thread.title.toLowerCase()).includes(replaceVietnameseChar(title.toLowerCase()))
      )
        return false;
      if (isMiss && thread.missCount === 0) return false;
      return true;
    })
    .sort((aKey, bKey) => {
      const aItem = itemsById[aKey];
      const bItem = itemsById[bKey];
      const compareFunction =
        !sort || sort === 'desc' ? aItem.updatedAt > bItem.updatedAt : aItem.updatedAt < bItem.updatedAt;
      return compareFunction ? -1 : 1;
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
