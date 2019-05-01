var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var guestSchema = require('../models/guest')
var rsvpSchema = require('../models/rsvp')

router.post('/login', function (req, res) {
   var id = req.body.guest;
   var pin = req.body.pin;
   guestSchema.authenticate(id,pin,false).then( (guest) => {
     authComplete = !!guest;

     // If the auth is done, we can set the session
     if (authComplete) {
       guest.password = null;
       console.log("set session:",guest)
       req.session.guest = guest;
       res.redirect('/');
     }
     else{
       // Fall through every case... go to login screen
       res.send(JSON.stringify({msg: 'Incorrect Guest or PIN.'}));
     }
   })
   .catch((err) => next(err));
});

router.get('/rsvp',   function (req, res) {
   var guest = req.session.guest;
   if (guest)
   {
     rsvpSchema.getByGuest(guest).then(function(rsvp){
       console.log(rsvp);
       console.log(guest);
       if (rsvp.validateRsvp(guest))
       {
         rsvp.save();
         res.send({success:true});
       }
       else {
         res.send({success:false, msg: "Invalid guest count."});
       }
     });
   }
   else {
     res.send({success:false});
   }
});

router.get('/', function (req, res) {
   res.send("API");
});

module.exports = router;
