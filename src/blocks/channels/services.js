import axios from 'axios';
import { normalize } from 'normalizr';
import { channel } from 'configs/normalizr';

export const fetchChannels = () =>
  axios.get('/api/v1/channels').then((res) => ({
    data: res.data,
    norm: normalize(res.data.data, [channel]),
  }));
