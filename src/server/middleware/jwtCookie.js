/* eslint no-param-reassign: 0 */

import { verifyJwt, signJwt } from '../jwt';
import { getUserById } from '../db/users';
import { get } from 'lodash';

const COOKIE_NAME = 'jwt';
const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}

export async function refreshJwtCookie(ctx, next) {
  if (ctx.isAuthenticated()) {
    const remember = get(ctx, 'req.user.remember') || get(ctx, 'request.body.remember') || false;
    const jwt = await signJwt(
      { id: ctx.req.user.id, remember },
      { expiresIn: remember ? '7d' : '10s' }
    );
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

  await next();
}

export async function authenticateJwtCookie(ctx, next) {
  const jwt = ctx.cookies.get(COOKIE_NAME);
  if (jwt) {
    try {
      const decoded = await verifyJwt(jwt);
      ctx.req.user = decoded;
    } catch (err) {
      console.log(err);
    }
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
    ctx.req.user = {
      ...ctx.req.user,
      ...user,
    };
  }

  await next();
}
