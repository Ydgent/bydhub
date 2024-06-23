const jwt = require('jsonwebtoken');
const {
  PRIVATE_KEY,
} = require('../app/config');

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 60 * 60 * 12,
    });
    ctx.body = {
      id,
      name,
      token,
    };
    await next();
  }

  async sucess(ctx, next) {
    ctx.body = '用户授权成功';
    await next();
  }
}

module.exports = new AuthController();
