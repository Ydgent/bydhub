const Router = require('koa-router');

const {
  avatarHandler,
  pictureHandler,
} = require('../middleware/file.middleware');
const {
  verifyAuth,
} = require('../middleware/auth.middleware');
const {
  saveAvatar,
  savePicture,
} = require('../controller/file.controller');


const fileRouter = new Router({ prefix: '/upload' });

fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatar);
fileRouter.post('/picture', verifyAuth, pictureHandler, savePicture);


module.exports = fileRouter;
