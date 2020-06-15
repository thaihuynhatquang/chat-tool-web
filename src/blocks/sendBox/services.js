import { client } from 'configs/axios';

export const sendMessage = ({ threadId, message, parentId, attachment }) => {
  const bodyForm = new FormData();
  bodyForm.set('threadId', threadId.toString()); // FormData only use string
  parentId && bodyForm.set('parentId', parentId);
  bodyForm.set('message', message);
  attachment && bodyForm.set('attachment', attachment);
  return client.post(`/api/v1/threads/${threadId}/messages`, bodyForm).then((res) => res.data);
};
