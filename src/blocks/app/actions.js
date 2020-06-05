export const FETCH_CURRENT_USER_SUCCEED = 'FETCH_CURRENT_USER_SUCCEED';
export const FETCH_ROLE_SUCCEED = 'FETCH_ROLE_SUCCEED';
export const REMOVE_SELECTED_CHANNEL_ID = 'REMOVE_SELECTED_CHANNEL_ID';
export const REMOVE_SELECTED_THREAD_ID = 'REMOVE_SELECTED_THREAD_ID';

export const fetchCurrentUserSucceed = (user) => ({
  type: FETCH_CURRENT_USER_SUCCEED,
  user,
});

export const removeSelectedChannelId = () => ({
  type: REMOVE_SELECTED_CHANNEL_ID,
});

export const removeSelectedThreadId = () => ({
  type: REMOVE_SELECTED_THREAD_ID,
});
