import io from 'socket.io-client';
import { accessToken } from './axios';

const socket = io('https://api.chatible.me', {
  query: {
    accessToken,
  },
});

export default socket;
