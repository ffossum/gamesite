import cookie from 'cookie';
import {getUserByJwt} from '../jwt';
import {LOG_OUT} from 'actions/login';

function getJwt(request) {
  const {headers} = request;
  const cookies = headers.cookie
    ? cookie.parse(headers.cookie)
    : {};

  return cookies.jwt;
}

export default function handleConnection(socket) {
  const token = getJwt(socket.request);
  getUserByJwt(token)
    .then(user => {
      socket.user = user;
      socket.emit('news', {hello: user.username});
      socket.on(LOG_OUT, () => {
        delete socket.user;
      });
    })
    .catch(err => {
      socket.emit('news', {hello: 'guest'});
    });
}
