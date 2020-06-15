import { client } from 'configs/axios';
import { message } from 'configs/normalizr';
import { normalize } from 'normalizr';
import { FETCH_MESSAGES_LIMIT } from './constants';

export const fetchMessages = ({ threadId, nextCursor, limit = FETCH_MESSAGES_LIMIT, parentId }) =>
  client
    .get(`/api/v1/threads/${threadId}/messages${parentId ? `/${parentId}` : ''}`, {
      params: {
        limit,
        nextCursor,
      },
    })
    .then((res) => ({
      data: res.data,
      norm: normalize(res.data.data, [message]),
    }));

export const fetchThreadLogs = ({ threadId }) =>
  client.get(`/api/v1/threads/${threadId}/status-logs`).then((res) => res.data);

export const clearMiss = (input) => client.put(`/api/v1/${input.type}s/${input.id}/clear-miss`);
