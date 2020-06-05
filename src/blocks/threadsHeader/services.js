import axios from 'axios';

export const fetchStatusThreadsCount = ({ channelId }) =>
  axios.get(`/api/v1/channels/${channelId}/status-thread-count`).then((res) => res.data);
