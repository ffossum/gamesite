import deepstream from 'deepstream.io-client-js';
import { once } from 'lodash/fp';

let client;

export const init = once(() => new Promise((resolve, reject) => {
  client = deepstream('localhost:6020');
  client.login({
    id: 'node server',
  }, (success) => {
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
