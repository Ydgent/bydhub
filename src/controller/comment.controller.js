const commentService = require('../service/comment.service');

class CommentController {
  async create(ctx, next) {
    // 拿到需要的值
    const { content, momentId } = ctx.request.body;
    const { id: userId } = ctx.user;
    const result = await commentService.create({ content, userId, momentId });
    ctx.body = result;
    await next();
  }

  async replay(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { id: userId } = ctx.user;
    const { commentId } = ctx.params;
    const result = await commentService.replay({ content, userId, commentId, momentId });
    ctx.body = result;
    await next();
  }

  async update(ctx, next) {
    const { commentId } = ctx.params;
    const { content } = ctx.request.body;
    const result = await commentService.update({ commentId, content});
    ctx.body = result;
    await next();
  }

  async deleteL(ctx, next) {
    const { commentId } = ctx.params;
    const result = await commentService.delete(commentId);
    ctx.body = result;
    await next();
  }

  async list(ctx, next) {
    const { momentId } = ctx.params;
    const result = await commentService.getCommentBymomentId(momentId);
    ctx.body = result;
    await next();
  }
}

module.exports = new CommentController();
