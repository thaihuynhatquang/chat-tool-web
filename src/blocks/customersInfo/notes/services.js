import axios from 'axios';

export const createNoteToCustomer = ({ customerId, content }) =>
  axios.post(`/api/v1/customers/${customerId}/notes`, { content }).then((res) => res.data);

export const updateNoteToCustomer = ({ customerId, content, noteId }) =>
  axios.put(`/api/v1/customers/${customerId}/notes/${noteId}`, { content }).then((res) => res.data);

export const removeNoteFromCustomer = ({ customerId, noteId }) =>
  axios.delete(`/api/v1/customers/${customerId}/notes/${noteId}`).then((res) => res.data);
