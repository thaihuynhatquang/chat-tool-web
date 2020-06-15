import { client } from 'configs/axios';
import { thread } from 'configs/normalizr';
import { normalize } from 'normalizr';

export const fetchUsersOfChannel = (channelId) =>
  client.get(`/api/v1/channels/${channelId}/users`).then((res) => res.data);

export const transferUser = (threadId, transferToUserId) =>
  client.post(`/api/v1/threads/${threadId}/transfer/${transferToUserId}`);

export const updateThreadStatus = ({ threadId, status, cause }) =>
  client.put(`/api/v1/threads/${threadId}/status`, { status, cause }).then((res) => ({
    data: res.data,
    norm: normalize(res.data, thread),
  }));
