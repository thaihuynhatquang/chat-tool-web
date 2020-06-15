import { client } from 'configs/axios';
const LIMIT_TAG_FETCH = 5;

export const fetchTags = ({ channelId, limit = LIMIT_TAG_FETCH, content = '' }) =>
  client.get(`/api/v1/channels/${channelId}/tags`, { params: { content, limit } }).then((res) => res.data);

export const addTagToCustomer = ({ customerId, tagId }) =>
  client.post(`/api/v1/customers/${customerId}/tags`, { tagId }).then((res) => res.data);

export const removeTagFromCustomer = ({ customerId, tagId }) =>
  client.delete(`/api/v1/customers/${customerId}/tags/${tagId}`).then((res) => res.data);
