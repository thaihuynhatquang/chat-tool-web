export const FETCH_THREADS_SUCCEED = 'FETCH_THREADS_SUCCEED';
export const SELECT_THREAD = 'SELECT_THREAD';
export const FETCH_MORE_THREADS_SUCCEED = 'FETCH_MORE_THREADS_SUCCEED';
export const FETCH_MORE_THREADS_ERROR = 'FETCH_MORE_THREADS_ERROR';

export const fetchThreadsSucceed = ({ data, norm }) => ({
  type: FETCH_THREADS_SUCCEED,
  data,
  norm,
});

export const selectThread = (id) => ({
  type: SELECT_THREAD,
  id,
});

export const fetchMoreThreadsSucceed = ({ data, norm }) => ({
  type: FETCH_MORE_THREADS_SUCCEED,
  data,
  norm,
});

export const fetchMoreThreadsError = (error) => ({
  type: FETCH_MORE_THREADS_ERROR,
  error,
});
