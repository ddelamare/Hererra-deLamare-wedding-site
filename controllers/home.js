/// This file servers the pages for GETs
var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth')
var guestSchema = require('../models/guest')

router.get('/',  auth, function (req, res) {
   res.render('home');
});

router.get('/login', function(req, res){
  res.render('login');
});

router.get('/logout',function(req,res)
{
  if (req.session)
    req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
