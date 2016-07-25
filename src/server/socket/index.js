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

export default {
  init: _.once(init),
  to(room) {
    return io.to(room);
  },
};
