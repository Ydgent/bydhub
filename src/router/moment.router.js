const Router = require('koa-router');

const {
  create,
  detail,
  list,
  update,
  deleteL,
  createMomentTagCourses,
  getFileInfo,
} = require('../controller/moment.controller');
const {
  verifyAuth,
  verifyPermission,
} = require('../middleware/auth.middleware');
const {
  verifyTagExisits,
} = require('../middleware/tag.middleware');


const momentRouter = new Router({ prefix: '/moment' });

momentRouter.post('/', verifyAuth, create);
momentRouter.get('/', list);
momentRouter.get('/:momentId', detail);
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update);
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, deleteL);
// 创建标签
momentRouter.get('/:momentId/tags', verifyAuth, verifyPermission, verifyTagExisits, createMomentTagCourses);
// 获取动态配图
momentRouter.get('/images/:filename', getFileInfo);

module.exports = momentRouter;
