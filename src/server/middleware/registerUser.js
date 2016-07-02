/* eslint no-param-reassign: 0 */

import { addUser, isUsernameAvailable, isEmailAvailable } from '../db/users';
import validator from 'validator';
import _ from 'lodash';
import { errors as registerUserErrors } from 'actions/registerUser';

export async function validateUsername(ctx, next) {
  const errors = ctx.state.errors || {};

  const { username } = ctx.request.body;
  const available = await isUsernameAvailable(username);
  if (!available) {
    errors.username = registerUserErrors.USERNAME_TAKEN;
  }

  ctx.state.errors = errors;
  await next();
}

export async function validateEmail(ctx, next) {
  const errors = ctx.state.errors || {};

  const { email } = ctx.request.body;
  if (!validator.isEmail(email)) {
    errors.email = registerUserErrors.INVALID_EMAIL;
  }
  const available = await isEmailAvailable(email);
  if (!available) {
    errors.email = registerUserErrors.EMAIL_TAKEN;
  }

  ctx.state.errors = errors;
  await next();
}

export async function registerUser(ctx, next) {
  if (!_.isEmpty(ctx.state.errors)) {
    ctx.status = 403;
    ctx.body = {
      errors: ctx.state.errors,
    };
  } else {
    const { email, username, password } = ctx.request.body;
    const user = await addUser(email, username, password);
    ctx.req.user = user;
    await next();
  }
}

export function sendUserId(ctx) {
  ctx.body = { userId: ctx.req.user.id };
}
