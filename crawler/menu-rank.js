const cheerio = require('cheerio');
const superagent = require('superagent');
const url = require('../config/url');

function getExplore (name) {
    let result = {
        title: '',
        explore: []
    };
    return new Promise((resolve, reject) => {
        superagent.get(url.rankRecomendUrl + name + '/')
        .set('User-Agent', 'Mozilla/5.0')
        .set('Referer', 'https://www.cnblogs.com/guolizhi')
        .end((err, response) => {
            if (err) {
                reject({
                    code: -404,
                    message: '网络错误，请稍后重试'
                });
            }
            const $ = cheerio.load(response.text, {decodeEntities: false});
            result.title = $('.homepage-title').text().trim();

            $('#add-more-container').children('article').each((index, item) => {
                let exploreItem = {};
                exploreItem['imgUrl'] = $(item).find('img').attr('src');
                exploreItem['menuName'] = $(item).find('.recipe-name').text().trim();
                exploreItem['author'] = $(item).find('.author-name').text().trim();
                exploreItem['doneNum'] = $(item).find('.author-name').next().text().trim().split(' ')[0];
                exploreItem['authorImg'] = $(item).find('.avatar').attr('src');
                result.explore.push(exploreItem);
            });

            resolve({
                code: 1,
                message: result
            });
        })
    });
}

getExplore('rising');