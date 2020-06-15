import { client } from 'configs/axios';

export const fetchQuickReplies = ({ content }) =>
  client.post('/api/v1/quickReplies', { content }).then((res) => res.data);
