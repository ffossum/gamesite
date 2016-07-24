export default function isInRoom(socket, roomName) {
  return socket.rooms[roomName];
}
