import jwt from 'jsonwebtoken';

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
}
