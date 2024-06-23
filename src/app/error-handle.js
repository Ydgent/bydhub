const errorTypes = require('../constants/error-types');

const errorHandle = (error, ctx) => {
  let state, message;
  console.log(error.message, 'error.message')
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      state = 400;
      message = '用户名，密码不能为空';
      break;
    case errorTypes.USERNAME_IS_EXIST:
      state = 400;
      message = '用户名已存在';
      break
    case errorTypes.USERNAME_IS_NOT_EXIST:
      state = 400;
      message = '用户名不存在';
      break
    case errorTypes.PASSWORD_NOT_OK:
      state = 400;
      message = '密码不正确';
      break
    case errorTypes.TOKENISONTPASS:
      state = 401;
      message = 'token验证未通过';
      break
    case errorTypes.NO_LOGIN:
      state = 401;
      message = '用户未登录';
      break
    case errorTypes.NO_UPDATE_MOMENT_PROMISSION:
      state = 401;
      message = '没有操作的权限';
      break
    default:
      state = 404;
      message = 'not found';
      break;
  }

  ctx.state = state;
  ctx.body = message;
}

module.exports = errorHandle;