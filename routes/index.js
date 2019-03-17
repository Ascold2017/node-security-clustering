var express = require('express');
var router = express.Router();
const rateLimit = require('express-rate-limit');
const csrf = require('csurf');
const csrfProtect = csrf({ cookie: true });

/* GET home page. */
router.get('/', csrfProtect, function(req, res, next) {
  res.render('index', { title: 'Express', csrftoken: req.csrfToken() });
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 2, // start blocking after 2 requests
  handler: function(req, res) {
    res.json({ status: 'Слишком много отправлений. Попробуйте через час' });
  },
});

router.post('/', csrfProtect, createAccountLimiter, function(req, res, next) {
  console.log(req.body);
  res.json({ status: 'OK', name: req.body.test });
});

module.exports = router;
