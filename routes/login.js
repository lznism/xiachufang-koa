const Router = require('koa-router');
const login = new Router();
const dbHandler = require('../utils/db');
const md5 = require('md5');

login.post('/login', async (ctx, next) => {
    const {username, password} = ctx.request.body;
    const sql = `select password from xcf_password 
        where username = '${username}'`;
    let result = await dbHandler(sql)
        .then(res => res)
        .catch(err => console.log(err));
    if (result.code === 0) {
        if (result.data.password === md5(password)) {
            ctx.body = {code: 0, message: '登录成功'};
        } else {
            ctx.body = {code: 1, message: '账号或密码不正确'};
        }
    } else {
        ctx.body = {code: 1, message: '账号或者密码不正确'};
    }
});

module.exports = login;