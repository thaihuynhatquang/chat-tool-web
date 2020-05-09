import { THREAD_STATUS_PROCESSING } from 'common/constants';

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
    filterBy: { channelId, title, status },
  } = state;
  const filterItems = items.filter((id) => {
    const thread = itemsById[id];
    if (thread.channelId !== channelId) return false;
    if (thread.status !== status) return false;
    if (title && !thread.title.toLowerCase().includes(title.toLowerCase())) return false;
    return true;
  });
  const filterItemsById = filterItems.reduce((acc, val) => ({ ...acc, [val]: itemsById[val] }), {});
  return {
    ...state,
    items: filterItems,
    itemsById: filterItemsById,
    totalCount: state.totalCount - items.length + filterItems.length,
  };
};
