var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var guestSchema = require('../models/guest')

router.post('/login', function (req, res) {
   var id = req.body.guest;
   var pin = req.body.pin;
   console.log(id);
   console.log(pin);
   guestSchema.authenticate(id,pin,false).then( (guest) => {
     authComplete = !!guest;

     // If the auth is done, we can set the session
     if (authComplete) {
       guest.password = null;
       req.session.guest = guest;
       res.redirect('/');
     }
     else{
       // Fall through every case... go to login screen
       res.render('login', {msg: 'Incorrect Guest or PIN.'});
     }
   })
   .catch((err) => next(err));
});

router.post('/rsvp',  auth, function (req, res) {
   res.render('home');
});

router.get('/', function (req, res) {
   res.send("API");
});

module.exports = router;
