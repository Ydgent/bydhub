const Router = require('koa-router');

const {
  login,
  sucess,
} = require('../controller/auth.controller');
const {
  verifyLogin,
  verifyAuth
} = require('../middleware/auth.middleware');


const userRouter = new Router({ prefix: '/login' });

userRouter.post('/', verifyLogin, login);
userRouter.post('/test', verifyAuth, sucess);

module.exports = userRouter;
