const fs = require('fs');

const userService  = require('../service/user.service');
const fileService = require('../service/file.service');

const { AVATARFILEPATH } = require('../constants/file-path');

class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的数据
    const user = ctx.request.body;
    // 查询数据
    const result = await userService.create(user);
    // 返回数据
    ctx.body = result;
  }

  async getAvatarInfo(ctx, next) {
    const { userId } = ctx.params;
    // 获取图片信息
    const avatarInfo = await fileService.getAvatarByUserId(userId);

    ctx.response.set('content-type', avatarInfo.mimetype);
    ctx.body = fs.createReadStream(`${AVATARFILEPATH}/${avatarInfo.filename}`);
    await next();
  }
}

module.exports = new UserController();
