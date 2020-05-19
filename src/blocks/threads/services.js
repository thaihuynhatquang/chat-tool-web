import axios from 'axios';
import { normalize } from 'normalizr';
import { thread } from 'configs/normalizr';

export const fetchThreadsByChannelId = (input) => {
  const { channelId, ...filterInput } = input;
  return axios
    .get(`/api/v1/channels/${channelId}/threads`, {
      params: filterInput,
    })
    .then((res) => ({
      data: res.data,
      norm: normalize(res.data.data, [thread]),
    }));
};
