import axios from 'axios';

export const me = () => axios.get('/api/v1/me');
