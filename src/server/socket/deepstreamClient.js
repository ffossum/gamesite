import deepstream from 'deepstream.io-client-js';
import { once } from 'lodash';

let client;

export const init = once(() => new Promise((resolve, reject) => {
  client = deepstream('localhost:6020');
  client.login({}, (success) => {
    if (success) {
      resolve(client);
    } else {
      reject();
    }
  });
}));

export default {
  init,
};
