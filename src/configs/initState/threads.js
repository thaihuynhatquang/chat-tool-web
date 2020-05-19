import { THREAD_STATUS_PROCESSING } from 'common/constants';
import { replaceVietnameseChar } from 'shared/utils';

export const initState = {
  items: [],
  itemsById: {},
  totalCount: 0,
  thread: null,
  filterBy: {
    status: THREAD_STATUS_PROCESSING,
  },
};

// Remove all current threads by filters. Requires update when filters logic changes.
export const threadsPostReducer = (state = initState) => {
  const {
    items,
    itemsById,
    filterBy: { channelId, title, status, isMiss, sort },
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
  const filterItemsById = filterItems.reduce((acc, val) => ({ ...acc, [val]: itemsById[val] }), {});
  return {
    ...state,
    items: filterItems,
    itemsById: filterItemsById,
    totalCount: state.totalCount - items.length + filterItems.length,
  };
};
