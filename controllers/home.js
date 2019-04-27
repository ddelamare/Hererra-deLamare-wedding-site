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

router.get('/add', function(req, res){
  var guest = new guestSchema({
    name: 'me',
    password: 'alsome'
  });
  guest.save();
  res.send("Added user");
});

//var MyModel = mongoose.model('Test', new mongoose.Schema({ name: String }));

//var test = new MyModel ({name :"hi"});
//test.save(test).catch(err => conmsole.log(error));
//MyModel.findOne(function(error, result) { console.log(error) });


module.exports = router;
