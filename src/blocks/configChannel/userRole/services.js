import { client } from 'configs/axios';

export const fetchUsersRole = ({ channelId, ...params }) =>
  client.get(`/api/v1/channels/${channelId}/users`, { params }).then((res) => res.data);

export const updateUsersRole = ({ channelId, ...input }) =>
  client.put(`/api/v1/channels/${channelId}/roles`, { ...input }).then((res) => res.data);

export const getRolesChannel = ({ channelId, ...input }) =>
  client.get(`/api/v1/channels/${channelId}/roles`, { ...input }).then((res) => res.data);

export const deleteUserFromChannel = ({ channelId, userId }) =>
  client.delete(`/api/v1/channels/${channelId}/users`, {
    data: { userId },
  });
