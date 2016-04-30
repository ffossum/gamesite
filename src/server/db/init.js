import * as gameStatuses from 'constants/gameStatus';
import _ from 'lodash';
import promise from 'bluebird';
const options = {
  promiseLib: promise,
};
const pgp = require('pg-promise')(options);

const connection = {
  host: 'localhost', // server name or IP address;
  port: 5432,
  database: 'game-site',
  user: 'postgres',
  password: 'postgres',
};

async function createTables(db) {
  await db.query(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    email_hash TEXT NOT NULL,
    password TEXT NOT NULL,
    created TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
  )`);

  try {
    const statuses = _.map(gameStatuses, status => `'${status}'`).join(', ');
    await db.query(`CREATE TYPE game_status AS ENUM (${statuses})`);
  } catch (e) {
    // Type already existed.
  }

  await db.query(`CREATE TABLE IF NOT EXISTS games (
    id TEXT PRIMARY KEY NOT NULL,
    host TEXT NOT NULL REFERENCES users,
    comment TEXT,
    status game_status NOT NULL DEFAULT $(defaultStatus),
    created TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
  )`, {
    defaultStatus: gameStatuses.NOT_STARTED,
  });

  await db.query(`CREATE TABLE IF NOT EXISTS users_games (
    user_id TEXT REFERENCES users ON DELETE CASCADE,
    game_id TEXT REFERENCES games ON DELETE CASCADE,
    PRIMARY KEY (user_id, game_id)
  )`);
}

function init() {
  const db = pgp(connection);
  createTables(db);
  return db;
}

export default _.once(init);
