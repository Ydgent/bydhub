const Router = require('koa-router');

const {
  create, 
  getAvatarInfo
} = require('../controller/user.controller');
const { verifyUser, handlePassWord } = require('../middleware/user.middleware');

const userRouter = new Router({ prefix: '/user' });

// 注册
userRouter.post('/', verifyUser, handlePassWord, create);
// 获取头像
userRouter.get('/:userId/avatar', getAvatarInfo);


module.exports = userRouter;
