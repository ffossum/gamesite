import r from 'rethinkdb';

export default async function connect() {
  return r.connect({
    host: 'localhost',
    port: 28015,
  });
}
