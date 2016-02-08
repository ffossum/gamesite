import jwt from 'jsonwebtoken';
import {getUserById} from '../db';

const COOKIE_NAME = 'jwt';
const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}

const secret = 'secret'; //TODO read from config

export async function refreshJwtCookie(ctx, next) {
  if (ctx.isAuthenticated()) {
    const jwt = await getJwt({id: ctx.req.user.id}, secret, {expiresIn: '7d'});
    ctx.cookies.set(COOKIE_NAME, jwt, {
      httpOnly: true,
      expires: getExpirationDate()
    });
  }
  await next();
}

function getJwt(payload, secret, options) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options, token => {
      resolve(token);
    });
  });
}

function lastWeek() {
  return new Date(Number(new Date()) - EXPIRATION_AGE);
}

export async function expireJwtCookie(ctx, next) {
  ctx.cookies.set(COOKIE_NAME, false, {
    httpOnly: true,
    expires: lastWeek()
  });
  ctx.status = 200;

  await next();
}

export async function authenticateJwtCookie(ctx, next) {
  const jwt = ctx.cookies.get(COOKIE_NAME);
  try {
    const decoded = await verifyJwt(jwt, secret);
    const user = await getUserById(decoded.id);
    ctx.req.user = user;
  } catch (err) {}

  await next();
}

function verifyJwt(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}
