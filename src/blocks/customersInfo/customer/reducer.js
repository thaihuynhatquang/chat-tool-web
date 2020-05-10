import { FETCH_CUSTOMERS_IN_THREAD_SUCCEED, SELECT_CUSTOMER } from './actions';
import { initStoreState } from 'configs/initState';

export default (state = initStoreState.customer, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_IN_THREAD_SUCCEED: {
      const { result, entities } = action.norm;
      const firstCustomerId = result.length > 0 ? result[0] : null;
      return {
        ...state,
        item: firstCustomerId ? entities.customers[firstCustomerId] : null,
        totalCount: action.data.count,
      };
    }
    case SELECT_CUSTOMER:
      return {
        ...state,
        item: action.customer,
      };
    default:
      return state;
  }
};
