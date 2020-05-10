export const FETCH_CUSTOMERS_IN_THREAD_SUCCEED = 'FETCH_CUSTOMERS_IN_THREAD_SUCCEED';
export const SELECT_CUSTOMER = 'SELECT_CUSTOMER';

export const fetchCustomersSucceed = ({ data, norm }) => ({
  type: FETCH_CUSTOMERS_IN_THREAD_SUCCEED,
  data,
  norm,
});

export const selectCustomer = (customer) => ({
  type: SELECT_CUSTOMER,
  customer,
});
