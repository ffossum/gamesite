import rethinkdbdash from 'rethinkdbdash';

const r = rethinkdbdash({
  host: __DOCKER__ ? 'database' : 'localhost',
  port: 28015,
});

export default r;
