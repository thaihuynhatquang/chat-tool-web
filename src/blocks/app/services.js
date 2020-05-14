import axios from 'axios';

export const me = () => axios.get('/api/v1/me');

export const auth = () => axios.get('/api/auth');
