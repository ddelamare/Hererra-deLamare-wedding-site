var guestSchema = require('../models/guest')


module.exports = function(req, res, next) {
  var id = req.query.id;
  var password = req.query.token;

  var authComplete = false;
  if (!id || !password)
  {
    res.redirect('/login');
    return
  }

  guestSchema.findOne({name: id}).then( (guest) => {
    if (!guest) return false;
    return guest.comparePassword(password)
  }).then( (isMatch) => {
    authComplete = !!isMatch;

    // If the
    if (authComplete) {
      next()
    }
    else{
      // Fall through every case... go to login screen
      res.redirect('/login');
    }
  })
  .catch((err) => next(err));
}
