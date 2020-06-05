export const FETCH_QUICKREPLIES_SUCCEED = 'FETCH_QUICKREPLIES_SUCCEED';
export const DELETE_QUICKREPLIES_SUCCEED = 'DELETE_QUICKREPLIES_SUCCEED';

export const fetchQuickRepliesSucceed = ({ data, norm }) => ({
  type: FETCH_QUICKREPLIES_SUCCEED,
  data,
  norm,
});

export const deleteQuickRepliesSucceed = (id) => ({
  type: DELETE_QUICKREPLIES_SUCCEED,
  id,
});
