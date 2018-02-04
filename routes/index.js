const Router = require('koa-router');

const router = new Router();
const getHomeData = require('../crawler/home');
const getMenuItem = require('../crawler/menu-item');
const getExplore = require('../crawler/menu-rank');
const getRecipeList = require('../crawler/recipe-list');
const getCategory = require('../crawler/category');

// 获取首页菜谱榜单数据
router.get('/home/:type', async (ctx, next) => {
    let type = ctx.params.type;
    let data = await getHomeData(type)
        .then(res => res)
        .catch(err => ({code: 0, message: '网络错误，请稍后重试'}));
    ctx.body = data;
});

// 获取单条菜谱数据
router.get('/recipe/:id', async (ctx, next) => {
    let recipeId = ctx.params.id;
    let data = await getMenuItem(recipeId)
        .then(res => res)
        .catch(err => ({code: 0, message: '网络错误，请稍后重试'}));
    ctx.body = data;
});

// 获取菜谱榜单数据
router.get('/explore/:type', async (ctx, next) => {
    let type = ctx.params.type;
    let data = await getExplore(type)
        .then(res => res)
        .catch(err => ({code: 0, message: '网络错误，请稍后重试'}));
    ctx.body = data;
});

// 获取流行菜单
router.get('/recipe_list/:id', async (ctx, next) => {
    let id = ctx.params.id;
    let data = await getRecipeList(id)
        .then(res => res)
        .catch(err => ({code: 0, message: '网络错误，请稍后重试'}));
    ctx.body = data;
});

// 获取菜谱分类数据
router.get('/category', async (ctx, next) => {
    let data = await getCategory()
        .then(res => res)
        .catch(err => ({code: 0, message: '网络错误，请稍后重试'}));
    ctx.body = data;
});

module.exports = router;