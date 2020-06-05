import axios from 'axios';
import { thread } from 'configs/normalizr';
import { normalize } from 'normalizr';

export const fetchUsersOfChannel = (channelId) =>
  axios.get(`/api/v1/channels/${channelId}/users`).then((res) => res.data);

export const transferUser = (threadId, transferToUserId) =>
  axios.post(`/api/v1/threads/${threadId}/transfer/${transferToUserId}`);

export const updateThreadStatus = ({ threadId, status, cause }) =>
  axios.put(`/api/v1/threads/${threadId}/status`, { status, cause }).then((res) => ({
    data: res.data,
    norm: normalize(res.data, thread),
  }));
