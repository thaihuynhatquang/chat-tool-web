import axios from 'axios';

export const fetchImages = ({ threadId, nextCursor, limit }) =>
  axios
    .get(`/api/v1/threads/${threadId}/attachments`, {
      params: { nextCursor, limit },
    })
    .then((res) => res.data)
    .then((res) => ({
      count: res.count,
      nextCursor: res.nextCursor,
      data: res.data.reduce((acc, message) => {
        const { attachments } = message.additionData;
        const normals = attachments.map((att) => ({
          src: att.payload.url,
        }));
        return [...acc, ...normals];
      }, []),
    }));
