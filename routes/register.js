const Router = require('koa-router');
const dbHandler = require('../utils/db');
const md5 = require('md5');

const router = new Router();

router.post('/register', async (ctx, next) => {
    const {username, password} = ctx.request.body;
    const sql = `insert into xcf_password 
        (username, password) values
        ('${username}', '${md5(password)}')`;
    let result = await dbHandler(sql)
        .then(res => res)
        .catch(err => console.log(err));
    if (result.code === 0) {
        ctx.body = {code: 0, message: '注册成功'};
    } else {
        ctx.body = {code: -1, message: result.message};
    }
});

module.exports = router;