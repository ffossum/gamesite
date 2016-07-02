import rethinkdbdash from 'rethinkdbdash';

const r = rethinkdbdash({
  host: 'localhost',
  port: 28015,
});

export default r;
