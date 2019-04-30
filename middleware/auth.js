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

  guestSchema.authenticate(id,password,sessionExists).then( (guest) => {
    authComplete = !!guest;

    // If the auth is done, we can set the session
    if (authComplete) {
      guest.password = null;
      req.session.guest = guest;
      return next();
    }
    else{
      // Fall through every case... go to login screen
      res.redirect('/login');
    }
  })
  .catch((err) => next(err));
}
