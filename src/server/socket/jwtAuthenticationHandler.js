// @flow
import EventEmitter from 'events';
import { parse } from 'cookie';
import { verifyJwt } from '../jwt';

async function getClientId(connectionData: http$IncomingMessage): Promise<?string> {
  const cookies = parse(connectionData.headers.cookie || '');
  try {
    const decoded = await verifyJwt(cookies.jwt);
    return decoded.id;
  } catch(err) {
    return;
  }
}

export default class JwtAuthenticationHandler extends EventEmitter {
  isReady = true;
  constructor() {
    super();
    this.emit('ready');
  }
  async isValidUser(connectionData: http$IncomingMessage, authData: Object = {}, callback: Function) {

    const clientId = authData.password === 'secret deepstream password'
      ? authData.id
      : await getClientId(connectionData);

    callback(true, { username: clientId });
  }
}
