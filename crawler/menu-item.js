const cheerio = require('cheerio');
const superagent = require('superagent');
const url = require('../config/url');

/**
 * 获取单个菜谱的详细信息
 * @param {Number} id 菜谱的ID
 */
function getMenuItem(id) {
    let result = {
        headImgUrl: '',
        title: '',
        rate: '',
        doneNum: '',
        description: '',
        author: '',
        materials: [],
        steps: []
    };

    return new Promise((resolve, reject) => {
        superagent.get(url.menuItemUrl + id + '/')
            .set('User-Agent', 'Mozilla/5.0')
            .set('Referer', 'https://www.cnblogs.com/guolizhi')
            .end((err, response) => {
                if (err) {
                    reject({
                        code: -404,
                        message: '网络错误，请稍后重试'
                    })
                };
                const $ = cheerio.load(response.text, {decodeEntities: false});
                
                result.headImgUrl = $('.recipe-cover > img').attr('data-src');
                
                result.title = $('h1.plain').text();
                
                result.rate = $('.cooked').children('span').eq(0).text().split(' ')[0];
                
                result.doneNum = $('.cooked').children('span').eq(1).text().split(' ')[0];
                
                result.description = $('#description .recipe-desc').html().replace(/<br>/g, '||').trim();
                
                result.author = $('span.author-name').text();
                
                $('#ings').find('li').each((index, item) => {
                    let materialsItem = {};
                    materialsItem['ingredient'] = $(item).find('.ingredient').text();
                    materialsItem['weight'] = $(item).find('.weight').text();
                    result.materials.push(materialsItem);
                });
        
                $('#steps').find('li').each((index, item) => {
                    let stepItem = {};
                    stepItem['subTitle'] = $(item).children('.sub-title').text();
                    if ($(item).find('img').length > 0) {
                        stepItem['stepImg'] = $(item).find('img').attr('data-src');
                    }
                    stepItem['description'] = $(item).find('p').text().trim();
        
                    result.steps.push(stepItem);
                });
        
                resolve({
                    code: 1,
                    message: result
                });
            });
    });
}