import axios from 'axios';

export const fetchQuickReplies = ({ content }) =>
  axios.post('/api/v1/quickReplies', { content }).then((res) => res.data);
