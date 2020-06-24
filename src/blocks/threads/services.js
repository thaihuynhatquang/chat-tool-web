import { client } from 'configs/axios';
import { thread } from 'configs/normalizr';
import { normalize } from 'normalizr';

export const fetchThreadsByChannelId = (input) => {
  const { channelId, ...filterInput } = input;
  return client
    .get(`/api/v1/channels/${channelId}/threads`, {
      params: filterInput,
    })
    .then((res) => ({
      data: res.data,
      norm: normalize(res.data.data, [thread]),
    }));
};

export const setProcessedThread = ({ threadId }) => client.put(`/api/v1/threads/${threadId}/clear-miss`);
