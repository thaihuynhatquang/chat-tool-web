import { client } from 'configs/axios';

export const fetchActiveStaffs = (threadId) =>
  client.get(`/api/v1/threads/${threadId}/user-serving`).then((res) => res.data);

export const fetchHistoryStaffs = (threadId) =>
  client.get(`/api/v1/threads/${threadId}/user-history`).then((res) => res.data);
