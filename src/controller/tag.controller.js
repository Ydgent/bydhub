const tagService = require('../service/tag.service');

class TagController {
  async create(ctx, next) {
    // 拿到需要的值
    const { tagId, tagName }= ctx.request.body;
    const result = await tagService.create({ tagId, tagName });
    
    ctx.body = result;
    await next();
  }
}

module.exports = new TagController();
