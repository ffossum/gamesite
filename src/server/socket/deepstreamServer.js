import Deepstream from 'deepstream.io';
import { once } from 'lodash';

const deepstream = new Deepstream();

const init = once(() => new Promise(resolve => {
  deepstream.start();
  deepstream.once('started', () => {
    resolve();
  });
}));

export default {
  init,
};
