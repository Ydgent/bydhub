const tagService = require('../service/tag.service');

const verifyTagExisits = async (ctx, next) => {
  const { tags } = ctx.request.body;
  const newTags = [];
  for(let tag_name of tags) {
    const [result] = await tagService.getCreateByName(tag_name);
    const tag = { tag_name }
    if (!result) {
      const res = await tagService.create({ tagName: tag_name, tagId: tag_name });
      tag.id = res.insertId;
    } else {
      tag.id = result.id;
    }
    newTags.push(tag);
  }
  ctx.tags = newTags;
  await next();
};

module.exports = {
  verifyTagExisits,
};
