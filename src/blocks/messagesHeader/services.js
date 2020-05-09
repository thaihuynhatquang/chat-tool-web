import axios from 'axios';
import { normalize } from 'normalizr';
import { thread } from 'configs/normalizr';

export const updateThreadStatus = ({ threadId, status }) =>
  axios.put(`/api/v1/threads/${threadId}/status`, { status }).then((res) => ({
    data: res.data,
    norm: normalize(res.data, thread),
  }));
