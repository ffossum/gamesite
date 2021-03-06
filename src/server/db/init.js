// @flow

import { noop, once } from 'lodash/fp';
import r from './rethinkdb';

async function initRdb() {
  try {
    await r.dbCreate('test').run().error(noop);

    await Promise.all([
      await r.tableCreate('users').run().error(noop),
      await r.tableCreate('games').run().error(noop),
    ]);

    const usersTable = r.table('users');
    await usersTable.indexCreate('username').run().error(noop);
    await usersTable.indexCreate('email').run().error(noop);

    await r.table('games')
      .indexCreate('users', { multi: true })
      .run()
      .error(noop);

    await r.table('users')
      .indexWait()
      .run()
      .error(noop);

    await r.table('games')
      .indexWait()
      .run()
      .error(noop);
  } catch (err) {
    console.log('error', err);
  }
}

export default once(initRdb);
