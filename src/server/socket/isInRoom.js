export default function isInRoom(socket, roomName) {
  const room = socket.adapter.rooms[roomName];

  if (!room) {
    return false;
  }

  return room.sockets[socket.id];
}
