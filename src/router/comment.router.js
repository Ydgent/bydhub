const Router = require('koa-router');

const {
  create,
  replay,
  update,
  deleteL,
  list,
} = require('../controller/comment.controller');
const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/auth.middleware');


const userRouter = new Router({ prefix: '/comment' });

userRouter.post('/', verifyAuth, create);
userRouter.post('/:commentId/replay', verifyAuth, replay);

// 修改评论
userRouter.patch('/:commentId', verifyAuth, verifyPermission, update);
// 删除评论
userRouter.delete('/:commentId', verifyAuth, verifyPermission, deleteL);
// 获取评论列表
userRouter.get('/:momentId', list);


module.exports = userRouter;
