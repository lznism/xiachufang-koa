const Router = require('koa-router');
const router = new Router();
const crawler = require('./crawler');
const register = require('./register');
const login = require('./login');

router.use('/api', crawler.routes(), crawler.allowedMethods());
router.use('/api', register.routes(), register.allowedMethods());
router.use('/api', login.routes(), login.allowedMethods());

module.exports = router;