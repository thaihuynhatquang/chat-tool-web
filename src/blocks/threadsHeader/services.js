import { client } from 'configs/axios';

export const fetchStatusThreadsCount = ({ channelId }) =>
  client.get(`/api/v1/channels/${channelId}/status-thread-count`).then((res) => res.data);
