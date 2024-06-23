const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// 数据库信息
dotenv.config();
// 公钥
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));
// 私钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));

module.exports = {
  APP_HOST,
  APP_PORT,
  MSQ_HOST,
  MSQ_DATABASE,
  MSQ_USER,
  MSQ_PASSWORD,
} = process.env;

module.exports.PUBLIC_KEY = PUBLIC_KEY;
module.exports.PRIVATE_KEY = PRIVATE_KEY;
