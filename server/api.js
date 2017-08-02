/**
 * Created by ksb on 2017. 8. 2..
 */
const router = require('express').Router()
const client = require('cheerio-httpcli');


router.get('/test', function(req, res, next) {
  const term = req.query.term
  const data = {};
  const p = client.fetch('http://www.google.com/search', { q: term })
  p.then(function (result) {
    console.log(result.response.headers);

    data.title = result.$('title').text();
    data.html = result.$.html();
    data.href = [];

    result.$('a').each(function (idx) {
      data.href.push(result.$(this).attr('href'));
    });
  })

  p.catch(function (err) {
    res.status(400).json({"message":'오류'});
  });

  p.finally(function () {
    res.status(200).json(data);
  });
})

module.exports = router
