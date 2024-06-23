const Router = require('koa-router');

const {
  create,
} = require('../controller/tag.controller');
const {
  verifyAuth,
} = require('../middleware/auth.middleware');


const tagRouter = new Router({ prefix: '/tag' });

tagRouter.post('/', verifyAuth, create);


module.exports = tagRouter;
