import { client } from 'configs/axios';
import { quickReply } from 'configs/normalizr';
import { normalize } from 'normalizr';

export const fetchQuickReplies = () =>
  client.get('/api/v1/quickReplies').then((res) => ({
    data: res.data,
    norm: normalize(res.data.data, [quickReply]),
  }));

export const deleteQuickReply = (id) => client.delete(`/api/v1/quickReplies/${id}`);
