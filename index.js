const Koa = require('koa');
const Router = require('koa-router');
const session = require('koa-session');
const bodyParser = require('koa-bodyparser');

const sessionConf = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true
};

const router = require('./routes');
const app = new Koa();

app.use(session(sessionConf, app));
app.use(bodyParser());
app.use(router.routes());
app.listen(3000);