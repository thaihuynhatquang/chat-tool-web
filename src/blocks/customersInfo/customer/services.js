import { client } from 'configs/axios';
import { customer } from 'configs/normalizr';
import { normalize } from 'normalizr';

export const fetchCustomersByThreadId = ({ threadId, name = '' }) =>
  client.get(`/api/v1/threads/${threadId}/customers`, { params: { name } }).then((res) => ({
    data: res.data,
    norm: normalize(res.data.data, [customer]),
  }));
