const cheerio = require('cheerio');
const superagent = require('superagent');
const url = require('../config/url');
/**
 * 获取首页的菜谱榜单，流行菜谱，新秀菜谱
 * @param {String} classname 类名
 */
function getContent (classname) {
    let result = {
        head: [],
        body: []
    };
    return new Promise((resolve, reject) => {
        superagent.get(url.homeUrl)
            .set('User-Agent', 'Mozilla/5.0')
            .set('Referer', 'https://www.cnblogs.com/guolizhi')
            .end((err, response) => {
                if (err) {
                    reject({
                        code: -404,
                        message: '网络错误，请稍后重试'
                    });
                };
                const $ = cheerio.load(response.text);
                $(`.${classname} .tiles-container`).children('a').each((index, item) => {
                    let headItem = {};
                    headItem['imgUrl'] = $(item).find('img').eq(0).attr('data-src');
                    headItem['title'] = $(item).find('.title').eq(0).text();
                    headItem['description'] = $(item).find('.desc').eq(0).text().trim();
                    headItem['href'] = $(item).attr('href');
                    result.head.push(headItem);
                });
                $(`.${classname}`).next().children('a').each((index, item) => {
                    let bodyItem = {};
                    bodyItem['href'] = $(item).attr('href');
                    bodyItem['imgUrl'] = $(item).find('img').eq(0).attr('data-src');
                    bodyItem['title'] = $(item).find('.name').eq(0).text();
                    let stat = $(item).find('.stat').eq(0).children('span');
                    bodyItem['rate'] = stat.eq(0).text();
                    bodyItem['doneNum'] = stat.eq(1).text();
                    result.body.push(bodyItem);
                });

                resolve({
                    code: 1,
                    message: result
                });
            });
    })
}

module.exports = getContent;
