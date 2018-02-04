const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('../config/url');

function getCategory () {
    let result = [];
    return new Promise((resolve, reject) => {
        superagent.get(url.categoryUrl)
        .set('User-Agent', 'Mozilla/5.0')
        .set('Referer', 'https://www.cnblogs.com/guolizhi')
        .end((err, response) => {
            if (err) {
                reject({
                    code: -404,
                    message: '获取菜单数据失败'
                });
            }
            const $ = cheerio.load(response.text);
            $('#site-body').children('section').each((index, item) => {
                let categoryItem = {};
                categoryItem['title'] = $(item).find('h3').text();
                categoryItem['info'] = [];
                $(item).find('a').each((_index, _item) => {
                    let categoryInfoItem = {};
                    categoryInfoItem['href'] = $(_item).attr('href');
                    categoryInfoItem['imgUrl'] = $(_item).find('img').attr('src');
                    categoryInfoItem['title'] = $(_item).find('.name').text();
                    categoryItem['info'].push(categoryInfoItem);
                });
                result.push(categoryItem);
            });
            resolve({
                code: 1,
                message: result
            })
        });
    });
}

module.exports = getCategory;
