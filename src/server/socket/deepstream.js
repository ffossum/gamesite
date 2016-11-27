import server from './deepstreamServer';
import client from './deepstreamClient';
import { once } from 'lodash';

export const init = once(async () => {
  await server.init();
  await client.init();
});

export default {
  init,
};
