import socketIo from 'socket.io';
import _ from 'lodash';

let io;

function init(server) {
  io = socketIo(server);

  let handleConnection = require('./handleConnection').default;
  io.on('connection', handleConnection);

  if (module.hot) {
    module.hot.accept('./handleConnection', () => {
      io.sockets.removeListener('connection', handleConnection);
      handleConnection = require('./handleConnection').default;
      io.on('connection', handleConnection);
    });
  }

  return io;
}

export function getConnectedUsers() {
  const room = io.sockets.adapter.rooms.users || {};
  const socketIds = _.keys(room.sockets);

  const sockets = io.sockets.sockets;
  let users = _.map(socketIds, socketId => sockets[socketId].user);
  users = _.uniqBy(users, user => user.id);

  return users;
}

export default {
  init: _.once(init),
};
