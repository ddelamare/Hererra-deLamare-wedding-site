/// This file servers the pages for GETs
var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth')
var guestSchema = require('../models/guest')
var rsvpSchema = require('../models/rsvp')

router.get('/',  auth, function (req, res) {
   res.render('home');
});

router.get('/login', function(req, res){
  res.render('login');
});

router.get('/rsvp', auth, function(req, res){
  var guest = req.session.guest;
  if (guest)
  {
    rsvpSchema.getByGuest(guest).then(function(existingRSVP){
      // Precalcualted values for rendering
      existingRSVP.accepted = existingRSVP.submitted && existingRSVP.accepts;
      existingRSVP.declined = existingRSVP.submitted && !existingRSVP.accepts;
      existingRSVP.numAdults = existingRSVP.submitted ? existingRSVP.numAdults : "";
      existingRSVP.numChildren = existingRSVP.submitted ? existingRSVP.numChildren : "";
      res.render('rsvp', {
        guest: req.session.guest,
        rsvp: existingRSVP || {}
      });
    });
  }
  else {
    conosle.log("Failed to render RSVP");
    res.redirect('/');
  }
});

router.get('/logout',function(req,res)
{
  if (req.session)
    req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
