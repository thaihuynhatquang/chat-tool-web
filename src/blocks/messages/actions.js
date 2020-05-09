export const FETCH_MESSAGES_SUCCEED = 'FETCH_MESSAGES_SUCCEED';
export const FETCH_MORE_MESSAGES_SUCCEED = 'FETCH_MORE_MESSAGES_SUCCEED';

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
