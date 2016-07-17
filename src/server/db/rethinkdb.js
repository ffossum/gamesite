import rethinkdbdash from 'rethinkdbdash';

const r = rethinkdbdash({
  host: 'database',
  port: 28015,
});

export default r;
