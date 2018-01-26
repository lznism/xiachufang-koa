const cheerio = require('cheerio');
const superagent = require('superagent');
const url = require('../config/url');

function getRecipeList(id) {
    let result = {
        title: '',
        from: '',
        subtitle: '',
        recipeList: []
    };
    return new Promise((resolve, reject) => {
        superagent.get(url.recipeListUrl + id + '/')
        .set('User-Agent', 'Mozilla/5.0')
        .set('Referer', 'https://www.cnblogs.com/guolizhi')
        .end((err, response) => {
            if (err) {
                resolve({
                    code: -404,
                    message: '网络异常，请稍后重试'
                });
            }
            const $ = cheerio.load(response.text);
            result.title = $('.basic').find('h1').text().trim();
            result.from = $('span.author').text();
            result.subtitle = $('.basic .desc').text();

            $('#add-more-container').children('article').each((index, item) => {
                let recipeItem = {};
                recipeItem['imgUrl'] = $(item).find('img').attr('src');
                recipeItem['menuName'] = $(item).find('.recipe-name').text();
                recipeItem['author'] = $(item).find('.author-name').text();
                recipeItem['doneNum'] = $(item).find('.extra').text().trim();
                recipeItem['avatar'] = $(item).find('.author').children('img').attr('src');
                recipeItem['url'] = $(item).children('a').attr('href');

                result.recipeList.push(recipeItem);
            });

            resolve({
                code: 1,
                message: result
            });
        });
    });
}

module.exports = getRecipeList;
