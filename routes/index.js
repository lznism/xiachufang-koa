const Router = require('koa-router');

const router = new Router();
const getHomeData = require('../crawler/home');
const getMenuItem = require('../crawler/menu-item');
const getExplore = require('../crawler/menu-rank');
const getRecipeList = require('../crawler/recipe-list');

// 获取首页菜谱榜单数据
router.get('/home/:type', async (ctx, next) => {
    let type = ctx.params.type;
    let data = await getHomeData(type).then(res => res);
    ctx.body = data;
});

// 获取单条菜谱数据
router.get('/recipe/:id', async (ctx, next) => {
    let recipeId = ctx.params.id;
    let data = await getMenuItem(recipeId).then(res => res);
    ctx.body = data;
});

// 获取菜谱榜单数据
router.get('/explore/:type', async (ctx, next) => {
    let type = ctx.params.type;
    let data = await getExplore(type).then(res => res);
    ctx.body = data;
});

// 获取流行菜单
router.get('/recipe_list/:id', async (ctx, next) => {
    let id = ctx.params.id;
    let data = await getRecipeList(id).then(res => res);
    ctx.body = data;
});

module.exports = router;