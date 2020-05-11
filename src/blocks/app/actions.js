export const FETCH_CURRENT_USER_SUCCEED = 'FETCH_CURRENT_USER_SUCCEED';

export const fetchCurrentUserSucceed = (user) => ({
  type: FETCH_CURRENT_USER_SUCCEED,
  user,
});
