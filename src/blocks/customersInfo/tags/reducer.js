import { ADD_TAG_TO_CUSTOMER, REMOVE_TAG_FROM_CUSTOMER } from './actions';
import { initStoreState } from 'configs/initState';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case ADD_TAG_TO_CUSTOMER: {
      const { tag, customerId } = action;
      if (!state.customerId) return state;
      if (state.customerId !== customerId) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            [customerId]: {
              ...state.entities.customers[customerId],
              tags: [...state.entities.customers[customerId].tags, tag],
            },
          },
        },
      };
    }
    case REMOVE_TAG_FROM_CUSTOMER: {
      const { tagId, customerId } = action;
      if (!state.customerId) return state;
      if (state.customerId !== customerId) return state;
      return {
        ...state,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            [customerId]: {
              ...state.entities.customers[customerId],
              tags: state.entities.customers[customerId].tags.filter((tag) => tag.id !== tagId),
            },
          },
        },
      };
    }
    default:
      return state;
  }
};
