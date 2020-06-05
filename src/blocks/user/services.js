import axios from 'axios';
import { normalize } from 'normalizr';
import { user } from 'configs/normalizr';

export const updateUserInfo = (updateInfo) =>
  axios.put('/api/v1/users/me', { ...updateInfo }).then((res) => ({
    data: res.data,
    norm: normalize(res.data, user),
  }));
