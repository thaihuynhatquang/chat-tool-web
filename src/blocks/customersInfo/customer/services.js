import axios from 'axios';
import { normalize } from 'normalizr';
import { customer } from 'configs/normalizr';

export const fetchCustomersByThreadId = ({ threadId, name = '' }) =>
  axios.get(`/api/v1/threads/${threadId}/customers`, { params: { name } }).then((res) => ({
    data: res.data,
    norm: normalize(res.data.data, [customer]),
  }));
