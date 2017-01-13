/* eslint no-param-reassign: 0 */

export default async function forgotPassword(ctx) {
  const { email } = ctx.request.body;
  console.log('password reset: ', email);
  // TODO send password reset email
  ctx.status = 200;
}
