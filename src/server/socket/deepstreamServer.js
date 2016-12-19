import Deepstream from 'deepstream.io';
import { once } from 'lodash';
import JwtAuthenticationHandler from './jwtAuthenticationHandler';
import PermissionHandler from './permissionHandler';

const deepstream = new Deepstream();

deepstream.set('authenticationHandler', new JwtAuthenticationHandler());
deepstream.set('permissionHandler', new PermissionHandler());

const init = once(() => new Promise(resolve => {
  deepstream.start();
  deepstream.once('started', () => {
    resolve();
  });
}));

export default {
  init,
};
