const Multer = require('koa-multer');
const fileService = require('../service/file.service');
const { AVATARFILEPATH, PICTUREFILEPATH } = require('../constants/file-path');


const avatarUpload = Multer({
  dest: AVATARFILEPATH,
});

const avatarHandler = avatarUpload.single('avatar');

const pictureUpload = Multer({
  dest: PICTUREFILEPATH,
});

const pictureHandler = pictureUpload.array('picture', 9);



// const avatarhandler = async (ctx, next) => {
//   const { avatar } = ctx.req;
//   console.log(avatar, 'avatar');
  
//   await next();
// };

module.exports = {
  avatarHandler,
  pictureHandler,
};
