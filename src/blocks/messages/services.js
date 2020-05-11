import axios from 'axios';
import { normalize } from 'normalizr';
import { message } from 'configs/normalizr';
import { FETCH_MESSAGES_LIMIT } from './constants';

export const fetchMessages = ({ threadId, nextCursor, limit = FETCH_MESSAGES_LIMIT }) =>
  axios
    .get(`/api/v1/threads/${threadId}/messages`, {
      params: {
        limit,
        nextCursor,
      },
    })
    .then((res) => ({
      data: res.data,
      norm: normalize(res.data.data, [message]),
    }));
