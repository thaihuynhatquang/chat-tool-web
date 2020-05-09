import axios from 'axios';
import { normalize } from 'normalizr';
import { thread } from 'configs/normalizr';

export const fetchThreadsByChannelId = (input) =>
  axios
    .get(`/api/v1/channels/${input.channelId}/threads`, {
      params: input,
    })
    .then((res) => ({
      data: res.data,
      norm: normalize(res.data.data, [thread]),
    }));
