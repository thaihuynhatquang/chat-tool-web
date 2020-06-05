import axios from 'axios';
export const fetchChannel = (channelId) => axios.get(`/api/v1/channels/${channelId}`).then((res) => res.data);

export const updateChannelInfo = (channelId, updateInfo) =>
  axios.put(`/api/v1/channels/${channelId}`, { ...updateInfo }).then((res) => res.data);

export const fetchRoleByChannel = (channelId) =>
  axios.get(`/api/v1/channels/${channelId}/roles`).then((res) => res.data.data);

export const fetchTagByChannel = (channelId) =>
  axios.get(`/api/v1/channels/${channelId}/tags`).then((res) => res.data.data);

export const createTag = (channelId, inputTag) =>
  axios.post(`/api/v1/channels/${channelId}/tags`, { ...inputTag }).then((res) => res.data);

export const updateTag = (tagId, inputTag) =>
  axios.put(`/api/v1/tags/${tagId}/`, { ...inputTag }).then((res) => res.data);

export const removeTag = (tagId) => axios.delete(`/api/v1/tags/${tagId}`);

export const createInviteLink = (channelId, roleIds, expireTime) =>
  axios
    .post(`/api/v1/channels/${channelId}/invitation-link`, {
      roleIds,
      expireTime,
    })
    .then((res) => res.data);

export const emitRefreshChannel = (channelId) => axios.post(`/api/v1/channels/${channelId}/refresh`);
