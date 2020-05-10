import { ADD_TAG_TO_CUSTOMER, REMOVE_TAG_FROM_CUSTOMER } from './actions';
import { initStoreState } from 'configs/initState';

export const customerInTags = (state = initStoreState.customer, action) => {
  switch (action.type) {
    case ADD_TAG_TO_CUSTOMER: {
      if (!state.item) return state;
      return {
        ...state,
        item: {
          ...state.item,
          tags: [...state.item.tags, action.tag],
        },
      };
    }
    case REMOVE_TAG_FROM_CUSTOMER: {
      if (!state.item) return state;
      return {
        ...state,
        item: {
          ...state.item,
          tags: state.item.tags.filter((tag) => tag.id !== action.tagId),
        },
      };
    }
    default:
      return state;
  }
};
