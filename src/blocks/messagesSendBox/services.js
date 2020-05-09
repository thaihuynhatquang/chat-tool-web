import axios from 'axios';

export const sendMessage = ({ threadId, message, parentId, attachment }) =>
  axios
    .post(`/api/v1/threads/${threadId}/messages`, {
      message,
      parentId,
      attachment,
    })
    .then((res) => res.data);
