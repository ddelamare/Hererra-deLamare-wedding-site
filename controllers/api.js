var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');
var guestSchema = require('../models/guest')
var rsvpSchema = require('../models/rsvp')

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
       console.log("set session:",guest)
       req.session.guest = guest;
       res.send({success:true});
     }
     else{
       // Fall through every case... go to login screen
       res.send(JSON.stringify({success:false, msg: 'Incorrect Guest or PIN.'}));
     }
   })
   .catch((err) => console.log(err));
});

router.post('/rsvp',   function (req, res) {
   var guest = req.session.guest;
   var accepts = req.body.accepts;
   var numAdults = req.body.numAdults;
   var numChildren = req.body.numChildren;
   var comments = req.body.comments;
   if (guest)
   {
     rsvpSchema.getByGuest(guest).then(function(rsvp){
       rsvp.accepts = accepts;
       rsvp.numAdults = numAdults;
       rsvp.numChildren = numChildren;
       rsvp.comments = comments;
       rsvp.submitted = true;
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

router.post('/addLogin', auth, function (req,res){
  for( var id in req.body.users )
  {
    var user = req.body.users[id];
    var guest = new guestSchema({
      name: user.Username,
      password: user.Password,
      maxSeats: user.MaxGuest,
      displayname: user.DisplayName
    });
    guest.save();
  }
  res.send("complete")
});


router.get('/', function (req, res) {
   res.send("API");
});

module.exports = router;
