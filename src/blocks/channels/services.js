import axios from 'axios';
import { channel } from 'configs/normalizr';
import { normalize } from 'normalizr';

export const fetchChannels = () =>
  axios.get('/api/v1/channels').then((res) => ({
    data: res.data,
    norm: normalize(res.data.data, [channel]),
  }));

export const updateUserConfigsOfChannel = ({ channelId, configs, userId = null }) =>
  axios.put(`/api/v1/users/channels/${channelId}/configs`, { configs, userId });
