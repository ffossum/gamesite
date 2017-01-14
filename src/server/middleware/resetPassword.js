/* eslint no-param-reassign: 0 */
import errorTypes from 'constants/errorType';
import { isValidResetPasswordToken, changePassword } from '../db/users';

export default async ctx => {
  const { password, userId, token } = ctx.request.body;

  const valid = await isValidResetPasswordToken(userId, token);
  if (valid) {
    const changed = await changePassword(userId, password);
    ctx.status = changed ? 200 : 500;
    if (!changed) {
      ctx.body = { errors: { generic: errorTypes.UNKNOWN_ERROR } };
    }
  } else {
    ctx.body = { errors: { generic: errorTypes.RESET_TOKEN_INVALID } };
    ctx.status = 403;
  }
};
