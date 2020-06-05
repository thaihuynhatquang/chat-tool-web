import axios from 'axios';

export const fetchUsersRole = ({ channelId, ...params }) =>
  axios.get(`/api/v1/channels/${channelId}/users`, { params }).then((res) => res.data);

export const updateUsersRole = ({ channelId, ...input }) =>
  axios.put(`/api/v1/channels/${channelId}/roles`, { ...input }).then((res) => res.data);

export const getRolesChannel = ({ channelId, ...input }) =>
  axios.get(`/api/v1/channels/${channelId}/roles`, { ...input }).then((res) => res.data);

export const deleteUserFromChannel = ({ channelId, userId }) =>
  axios.delete(`/api/v1/channels/${channelId}/users`, {
    data: { userId },
  });
