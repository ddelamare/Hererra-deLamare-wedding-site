/// This file servers the pages for GETs
var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth')

router.get('/', auth, function (req, res) {
   res.render('home');
});

router.get('/login', function(req, res){
  res.render('login');
});

module.exports = router;
