import axios from 'axios';

export const fetchActiveStaffs = (threadId) =>
  axios.get(`/api/v1/threads/${threadId}/user-serving`).then((res) => res.data);

export const fetchHistoryStaffs = (threadId) =>
  axios.get(`/api/v1/threads/${threadId}/user-history`).then((res) => res.data);
