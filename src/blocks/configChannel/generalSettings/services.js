import { client } from 'configs/axios';
export const fetchChannel = (channelId) => client.get(`/api/v1/channels/${channelId}`).then((res) => res.data);

export const updateChannelInfo = (channelId, updateInfo) =>
  client.put(`/api/v1/channels/${channelId}`, { ...updateInfo }).then((res) => res.data);

export const fetchRoleByChannel = (channelId) =>
  client.get(`/api/v1/channels/${channelId}/roles`).then((res) => res.data.data);

export const fetchTagByChannel = (channelId) =>
  client.get(`/api/v1/channels/${channelId}/tags`).then((res) => res.data.data);

export const createTag = (channelId, inputTag) =>
  client.post(`/api/v1/channels/${channelId}/tags`, { ...inputTag }).then((res) => res.data);

export const updateTag = (tagId, inputTag) =>
  client.put(`/api/v1/tags/${tagId}/`, { ...inputTag }).then((res) => res.data);

export const removeTag = (tagId) => client.delete(`/api/v1/tags/${tagId}`);

export const createInviteLink = (channelId, roleIds, expireTime) =>
  client
    .post(`/api/v1/channels/${channelId}/invitation-link`, {
      roleIds,
      expireTime,
    })
    .then((res) => res.data);

export const emitRefreshChannel = (channelId) => client.post(`/api/v1/channels/${channelId}/refresh`);
