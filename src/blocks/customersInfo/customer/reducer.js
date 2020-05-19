import { FETCH_CUSTOMERS_IN_THREAD_SUCCEED, SELECT_CUSTOMER } from './actions';
import { initStoreState } from 'configs/initState';

export default (state = initStoreState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_IN_THREAD_SUCCEED: {
      const { result, entities } = action.norm;
      const firstCustomerId = result.length > 0 ? result[0] : null;
      return {
        ...state,
        customerId: firstCustomerId,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            ...entities.customers,
          },
        },
        totalCustomersCount: action.data.count,
      };
    }
    case SELECT_CUSTOMER: {
      const { customer } = action;
      // TODO: Should filter previous customer if not in used
      return {
        ...state,
        customerId: customer.id,
        entities: {
          ...state.entities,
          customers: {
            ...state.entities.customers,
            [customer.id]: customer,
          },
        },
      };
    }
    default:
      return state;
  }
};
