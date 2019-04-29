var guestSchema = require('../models/guest')


module.exports = function(req, res, next) {
  var id = req.query.id;
  var password = req.query.token;

  var authComplete = false;
  var sessionExists = false;

  if (req.session.guest)
  {
    id = req.session.guest.name;
    sessionExists = true;
  }
  if ((!id || !password) && !sessionExists)
  {
    res.redirect('/login');
    return;
  }

  guestSchema.findOne({name: id}).then( (guest) => {
    if (!guest) return false;

    delete guest.password;
    req.session.guest = guest;

    return sessionExists || guest.comparePassword(password)
  }).then( (isMatch) => {
    authComplete = !!isMatch;

    // If the
    if (authComplete) {
      return next();
    }
    else{
      // Fall through every case... go to login screen
      res.redirect('/login');
    }
  })
  .catch((err) => next(err));
}
