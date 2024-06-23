const fileService = require('../service/file.service');
const userService = require('../service/user.service');

const { AVATARFILEPATH } = require('../constants/file-path');

const { APP_HOST, APP_PORT } = require('../app/config');


class FileController {
  async saveAvatar(ctx, next) {
    // 拿到需要的值
    const { filename, mimetype, size }= ctx.req.file;
    const { id } = ctx.user;
    await fileService.createAvatar({ filename, mimetype, size, userId: id });

    // 将头像信息保存到user表里面
    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`;
    await userService.setAvatarToUser({ avatarUrl, userId: id });
    
    ctx.body = '头像保存成功';
    await next();
  }

  async savePicture(ctx, next) {
    // 拿到需要的值
    const files = ctx.req.files;
    const { id } = ctx.user;
    const { momentId } = ctx.query;
    for (let file of files) {
      const {  filename, mimetype, size } = file;
      await fileService.createFile({ filename, mimetype, size, userId: id, momentId });
    }

    ctx.body = '图片保存成功';
    await next();
  }
}

module.exports = new FileController();
