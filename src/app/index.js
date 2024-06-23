const Koa = require('koa');
const bodyParse = require('koa-bodyparser');
const useRouter = require('../router/index');

const errorHandle = require('../app/error-handle');

const app = new Koa();

app.use(bodyParse());
useRouter(app);


app.on('error', errorHandle);

module.exports = app;
