import io from 'socket.io-client';

const HOST = `${location.protocol}//${location.hostname}:8080`;
const socket = io(HOST);

export default socket;
