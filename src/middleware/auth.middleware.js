const jwt = require('jsonwebtoken');

const errorTypes = require('../constants/error-types');
const userService = require('../service/user.service');
const authService = require('../service/auth.service');
const {
  PUBLIC_KEY
} = require('../app/config');
const {
  md5Word,
} = require('../utils/password-handle');

// 验证用户登录信息
const verifyLogin = async (ctx, next) => {
  console.log('用户登录的账号密码验证');
  // 拿到需要检测的值
  const { userName, passWord } = ctx.request.body;
  // 判断用户是否为空
  if (!userName || !passWord) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx);
  }
  // 判断用户是否存在
  const result = await userService.getUserByName(userName);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USERNAME_IS_NOT_EXIST);
    return ctx.app.emit('error', error, ctx);
  }
  // 判断用户名密码是否正确
  if (md5Word(passWord) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_NOT_OK);
    return ctx.app.emit('error', error, ctx);
  }

  ctx.user = user;
  await next();
};

// 用户登录验证token
const verifyAuth = async (ctx, next) => {
  console.log('用户登录验证token的中间件');
  // 1.获取token
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    const error = new Error(errorTypes.NO_LOGIN);
    return ctx.app.emit('error', error, ctx);
  }
  const token = authorization.replace('Bearer ', '');
  // 2.验证token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.TOKENISONTPASS);
    return ctx.app.emit('error', error, ctx);
  }
};

// 验证权限的中间件
const verifyPermission = async (ctx, next) => {
  console.log('验证权限的中间件');
  // 1.获取需要的值（resourceId, userId）
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace('Id', '');
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;
  // 2.查询是否具备权限
  try {
    const isPromission = await authService.checkResource({ tableName, id: resourceId, userId: id });
    if (!isPromission) throw Error();
    await next();
  } catch (err) {
    const error = new Error(errorTypes.NO_UPDATE_MOMENT_PROMISSION);
    return ctx.app.emit('error', error, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
