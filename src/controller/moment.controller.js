const fs = require('fs');

const fileService = require('../service/file.service');
const momentService = require('../service/moment.service');
const tagService = require('../service/tag.service');

const { PICTUREFILEPATH } = require('../constants/file-path');
const { APP_HOST, APP_PORT } = require('../app/config');

class MomentController {
  async create(ctx, next) {
    // 拿到需要的值
    const { content }= ctx.request.body;
    const { id } = ctx.user;
    const result = await momentService.create({ content, id });
    
    ctx.body = result;
    await next();
  }

  async detail(ctx, next) {
    // 获取momentid
    const momentId = ctx.params.momentId || ctx.query.momentId;
    const result = await momentService.getMomentById(momentId);
    ctx.body = result;
    await next();
  }

  async list(ctx, next) {
    // 获取momentidList
    const { pageNo, pageSize } = ctx.query;
    const result = await momentService.getMomentList({ pageNo, pageSize });
    ctx.body = result;
    await next();
  }

  async update(ctx, next) {
    // 获取需要的值
    const { content } = ctx.request.body;
    const { momentId } = ctx.params;
    const result = await momentService.updateList({ content, momentId });
    ctx.body = result;
    await next()
  }

  async deleteL(ctx, next) {
    // 获取需要的值
    const { momentId } = ctx.params;
    const result = await momentService.deleteById(momentId);
    ctx.body = result;
    await next();
  }

  async createMomentTagCourses(ctx, next) {
    const { momentId } = ctx.params;
    const { tags } = ctx;

    // 添加所有的标签
    for(let tag of tags) {
      // 判断tag表里面是否有momentId和tag的对应关系
      const result = await tagService.getTagByMomentId({ momentId, tagId: tag.id });
      if (!result) {
        await tagService.createMomentTagCourses({ momentId, tagId: tag.id });
      }
    }
    ctx.body = "动态标签关系表创建成功";
    await next();
  }

  async getFileInfo(ctx, next) {
    const { filename } = ctx.params;

    const [fileInfo] = await fileService.getFileByFilename(filename);

    ctx.response.set('content-type', fileInfo.mimetype);
    ctx.body = fs.createReadStream(`${PICTUREFILEPATH}/${filename}`);
    await next();
  }
}

module.exports = new MomentController();
