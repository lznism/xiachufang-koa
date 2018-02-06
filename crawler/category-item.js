const superagent = require('superagent');
const cheerio = require('cheerio');
const url = require('../config/url');

function getCategoryItem(id, recent = "/") {
    let result = [];
    return new Promise((resolve, reject) => {
        superagent.get(`${url.categoryUrl}/${id}${recent}`)
            .set('User-Agent', 'Mozilla/5.0')
            .set('Referer', 'https://www.cnblogs.com/guolizhi')
            .end((err, response) => {
                if(err) {
                    reject({
                        code: -404,
                        message: '抓取数据失败'
                    });
                }
                const $ = cheerio.load(response.text);
                $('#add-more-container').children('a').each((index, item) => {
                    let menuItem = {};
                    menuItem['href'] = $(item).attr('href');
                    menuItem['imgUrl'] = $(item).find('img').attr('data-src');
                    menuItem['title'] = $(item).find('header').text().trim();
                    menuItem['rate'] = $(item).find('.stat').find('span').eq(0).text().trim();
                    menuItem['doneNum'] = $(item).find('.stat').find('span').eq(1).text().trim();

                    result.push(menuItem);
                });

                resolve({
                    code: 1,
                    message: result
                });
            });
    });
}

module.exports = getCategoryItem;