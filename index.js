const Koa = require('koa');
const app = Koa();
const router = require('./routes/index');

app.use(router.routes());
app.listen(3000);