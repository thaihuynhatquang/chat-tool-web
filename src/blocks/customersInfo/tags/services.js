import axios from 'axios';
const LIMIT_TAG_FETCH = 5;

export const fetchTags = ({ channelId, limit = LIMIT_TAG_FETCH, content = '' }) =>
  axios.get(`/api/v1/channels/${channelId}/tags`, { params: { content, limit } }).then((res) => res.data);

export const addTagToCustomer = ({ customerId, tagId }) =>
  axios.post(`/api/v1/customers/${customerId}/tags`, { tagId }).then((res) => res.data);

export const removeTagFromCustomer = ({ customerId, tagId }) =>
  axios.delete(`/api/v1/customers/${customerId}/tags/${tagId}`).then((res) => res.data);
