import { client } from 'configs/axios';
import { user } from 'configs/normalizr';
import { normalize } from 'normalizr';

export const updateUserInfo = (updateInfo) =>
  client.put('/api/v1/users/me', { ...updateInfo }).then((res) => ({
    data: res.data,
    norm: normalize(res.data, user),
  }));
