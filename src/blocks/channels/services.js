import { client } from 'configs/axios';
import { channel } from 'configs/normalizr';
import { normalize } from 'normalizr';

export const fetchChannels = () =>
  client.get('/api/v1/channels').then((res) => ({
    data: res.data,
    norm: normalize(res.data.data, [channel]),
  }));

export const updateUserConfigsOfChannel = ({ channelId, configs, userId = null }) =>
  client.put(`/api/v1/users/channels/${channelId}/configs`, { configs, userId });
