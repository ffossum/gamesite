import {getUserByName, addUser} from '../db';
import {errors as registerUserErrors} from 'actions/registerUser';

export async function checkUsernameAvailability(ctx, next) {
  const {username} = ctx.request.body;
  const existingUser = await getUserByName(username);
  if (existingUser) {
    const errors = ctx.state.errors || {};
    errors.username = registerUserErrors.USERNAME_TAKEN;
    ctx.state.errors = errors;
  }
  await next();
}

export async function registerUser(ctx, next) {
  if (ctx.state.errors) {
    ctx.status = 403;
    ctx.body = {
      errors: ctx.state.errors
    };
  } else {
    const {username, password} = ctx.request.body;
    const user = await addUser(username, password);
    ctx.req.user = user;
    await next();
  }
}
