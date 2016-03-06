import cookie from 'cookie';
import {getUserByJwt} from '../jwt';
import _ from 'lodash';
import {LOG_OUT, LOG_IN_SUCCESS} from 'actions/login';

function getJwt(request) {
  const {headers} = request;
  const cookies = headers.cookie
    ? cookie.parse(headers.cookie)
    : {};

  return cookies.jwt;
}

function getPublicUserData(user) {
  return _.pick(user, ['id', 'emailHash', 'username']);
}

export default function handleConnection(socket) {
  const token = getJwt(socket.request);
  getUserByJwt(token)
    .then(user => {
      socket.user = user;
      socket.emit('news', {hello: user.username});
      socket.emit(LOG_IN_SUCCESS, {user: getPublicUserData(socket.user)});
      socket.on(LOG_OUT, () => {
        delete socket.user;
      });
    })
    .catch(err => {
      socket.emit('news', {hello: 'guest'});
    });
}
