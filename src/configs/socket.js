import io from 'socket.io-client';
import vars from 'vars';

const socket = io(vars.REACT_APP_BASE_SERVER_URL);

export default socket;
