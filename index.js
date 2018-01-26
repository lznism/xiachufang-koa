const Koa = require('koa');
const Router = require('koa-router');

const router = require('./routes');
const app = new Koa();
const api = new Router();

api.use('/api', router.routes(), router.allowedMethods());
app.use(api.routes());
app.listen(3000);