const superagent = require('superagent');

const request = superagent.set('User-Agent', 'Mozilla/5.0 Chrome/63.0.3239.132 Safari/537.36');

module.exports = request;