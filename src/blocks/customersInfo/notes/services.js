import { client } from 'configs/axios';

export const createNoteToCustomer = ({ customerId, content }) =>
  client.post(`/api/v1/customers/${customerId}/notes`, { content }).then((res) => res.data);

export const updateNoteToCustomer = ({ customerId, content, noteId }) =>
  client.put(`/api/v1/customers/${customerId}/notes/${noteId}`, { content }).then((res) => res.data);

export const removeNoteFromCustomer = ({ customerId, noteId }) =>
  client.delete(`/api/v1/customers/${customerId}/notes/${noteId}`).then((res) => res.data);
