/* eslint no-param-reassign: 0 */

import { verifyJwt, signJwt } from '../jwt';
import { getUserById } from '../db';

const COOKIE_NAME = 'jwt';
const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}

export async function refreshJwtCookie(ctx, next) {
  if (ctx.isAuthenticated()) {
    const jwt = await signJwt({ id: ctx.req.user.id }, { expiresIn: '7d' });
    ctx.cookies.set(COOKIE_NAME, jwt, {
      httpOnly: true,
      expires: getExpirationDate(),
    });
  }
  await next();
}

function lastWeek() {
  return new Date(Number(new Date()) - EXPIRATION_AGE);
}

export async function expireJwtCookie(ctx, next) {
  ctx.cookies.set(COOKIE_NAME, false, {
    httpOnly: true,
    expires: lastWeek(),
  });
  ctx.status = 200;

  await next();
}

export async function authenticateJwtCookie(ctx, next) {
  const jwt = ctx.cookies.get(COOKIE_NAME);
  try {
    const decoded = await verifyJwt(jwt);
    ctx.req.user = decoded;
  } catch (err) {
    // Do nothing
  }

  await next();
}

export async function requireAuthentication(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.status = 401;
  }
}

export async function fetchAuthenticatedUserData(ctx, next) {
  if (ctx.isAuthenticated()) {
    const user = await getUserById(ctx.req.user.id);
    ctx.req.user = user;
  }

  await next();
}
