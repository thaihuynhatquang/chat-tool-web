export const ADD_TAG_TO_CUSTOMER = 'ADD_TAG_TO_CUSTOMER';
export const REMOVE_TAG_FROM_CUSTOMER = 'REMOVE_TAG_FROM_CUSTOMER';

export const addTagToCustomer = ({ customerId, tag }) => ({
  type: ADD_TAG_TO_CUSTOMER,
  customerId,
  tag,
});

export const removeTagFromCustomer = ({ customerId, tagId }) => ({
  type: REMOVE_TAG_FROM_CUSTOMER,
  customerId,
  tagId,
});
