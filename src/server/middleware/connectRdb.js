/* eslint no-param-reassign: 0 */

import connect from '../db/connect';

export async function connectRdb(ctx, next) {
  const conn = await connect();

  ctx.req.rdbConn = conn;
  ctx.request.rdbConn = conn;

  await next();

  conn.close();
}
