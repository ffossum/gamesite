import cookie from 'cookie';
import {getUserByJwt} from '../jwt';

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
    });
}
