import _, { noop } from 'lodash';
import r from 'rethinkdb';
import connect from './connect';

async function initRdb() {
  let conn;
  try {
    conn = await connect();

    await r.dbCreate('test').run(conn).error(noop);

    await Promise.all([
      await r.tableCreate('users').run(conn).error(noop),
      await r.tableCreate('games').run(conn).error(noop),
      await r.tableCreate('users_games').run(conn).error(noop),
    ]);

    await r.table('users').indexCreate('username').run(conn).error(noop);
    await r.table('users_games').indexCreate('userId').run(conn).error(noop);
    await r.table('users_games').indexCreate('gameId').run(conn).error(noop);
    await r.table('users').indexWait().run(conn).error(noop);
  } catch (err) {
    console.log('error', err);
  }

  if (conn) {
    conn.close();
  }
}

function init() {
  initRdb();
}

export default _.once(init);
