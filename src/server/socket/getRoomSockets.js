import _ from 'lodash';

export default function getRoomSockets(socket, roomName) {
  const room = socket.adapter.rooms[roomName];

  if (!room) {
    return [];
  }

  const socketIds = _.keys(room.sockets);
  return _.map(socketIds, socketId => socket.nsp.sockets[socketId]);
}
