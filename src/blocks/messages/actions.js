export const FETCH_MESSAGES_SUCCEED = 'FETCH_MESSAGES_SUCCEED';
export const FETCH_MORE_MESSAGES_SUCCEED = 'FETCH_MORE_MESSAGES_SUCCEED';
export const FETCH_MORE_REPLIES_SUCCEED = 'FETCH_MORE_REPLIES_SUCCEED';
export const UPDATE_AVATAR_CUSTOMER_SUCCEED = 'UPDATE_AVATAR_CUSTOMER_SUCCEED';

export const updateAvatarCustomerSucceed = (updateCustomer) => ({
  type: UPDATE_AVATAR_CUSTOMER_SUCCEED,
  updateCustomer,
});

export const fetchMessagesSucceed = ({ data, norm }) => ({
  type: FETCH_MESSAGES_SUCCEED,
  data,
  norm,
});

export const fetchMoreMessagesSucceed = ({ data, norm }) => ({
  type: FETCH_MORE_MESSAGES_SUCCEED,
  data,
  norm,
});

export const fetchMoreRepliesSucceed = ({ data, norm, parentId }) => ({
  type: FETCH_MORE_REPLIES_SUCCEED,
  data,
  norm,
  parentId,
});
