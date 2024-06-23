const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const {
  md5Word,
} = require('../utils/password-handle');
// 用户名密码基本判断
const verifyUser = async (ctx, next) => {
  // 拿到需要检测的值
  const { userName, passWord } = ctx.request.body;
  // 判断用户是否为空
  if (!userName || !passWord) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 判断用户是否存在
  const result = await userService.getUserByName(userName);
  if (result.length) {
    const error = new Error(errorTypes.USERNAME_IS_EXIST);
    return ctx.app.emit('error', error, ctx);
  }

  await next();
};
// 密码md5加密存储到数据库
const handlePassWord = async (ctx, next) => {
  // 拿到需要处理的值
  const { passWord } = ctx.request.body;
  ctx.request.body.passWord = md5Word(passWord);

  await next();
};

module.exports = {
  verifyUser,
  handlePassWord,
};
