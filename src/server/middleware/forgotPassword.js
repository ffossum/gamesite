/* eslint no-param-reassign: 0 */
import { saveForgotPasswordToken } from '../db/users';
import { randomBytes } from '../crypto';

export default async function forgotPassword(ctx) {
  const { email } = ctx.request.body;
  const token = (await randomBytes(20)).toString('hex');
  const updatedUser = await saveForgotPasswordToken(email, token);

  console.log('password reset: ', `localhost:8080/reset?id=${updatedUser.id}&token=${token}`);
  // TODO send password reset email

  ctx.status = 200;
}
