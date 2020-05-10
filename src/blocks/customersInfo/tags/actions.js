export const ADD_TAG_TO_CUSTOMER = 'ADD_TAG_TO_CUSTOMER';
export const REMOVE_TAG_FROM_CUSTOMER = 'REMOVE_TAG_FROM_CUSTOMER';

export const addTagToCustomer = (tag) => ({
  type: ADD_TAG_TO_CUSTOMER,
  tag,
});

export const removeTagFromCustomer = (tagId) => ({
  type: REMOVE_TAG_FROM_CUSTOMER,
  tagId,
});
