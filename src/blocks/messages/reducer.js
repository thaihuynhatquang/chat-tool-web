import { FETCH_MESSAGES_SUCCEED, FETCH_MORE_MESSAGES_SUCCEED } from './actions';
import { initStoreState } from 'configs/initState';

export default (state = initStoreState.messages, action) => {
  switch (action.type) {
    case FETCH_MESSAGES_SUCCEED: {
      const { entities, result } = action.norm;
      return {
        ...state,
        items: result,
        itemsById: entities.messages,
      };
    }
    case FETCH_MORE_MESSAGES_SUCCEED: {
      const { entities, result } = action.norm;
      return {
        ...state,
        items: [...state.items, ...result],
        itemsById: {
          ...state.itemsById,
          ...entities.messages,
        },
      };
    }
    default:
      return state;
  }
};
