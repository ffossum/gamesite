import _, { noop } from 'lodash';
import r from './rethinkdb';

async function initRdb() {
  try {
    await r.dbCreate('test').run().error(noop);

    await Promise.all([
      await r.tableCreate('users').run().error(noop),
      await r.tableCreate('games').run().error(noop),
    ]);

    await r.table('users')
      .indexCreate('username')
      .run()
      .error(noop);

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

function init() {
  initRdb();
}

export default _.once(init);
