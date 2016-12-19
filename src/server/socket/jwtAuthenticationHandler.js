import EventEmitter from 'events';

export default class JwtAuthenticationHandler extends EventEmitter {
  constructor(...args) {
    super(...args);
    this.isReady = true;
    this.emit('ready');
  }
  isValidUser(connectionData, authData, callback) {
    // TODO check jwt cookie in connectionData.headers when deepstream bug is published to npm

    callback(true, {
      username: authData.id || 'open',
    });
  }
}
