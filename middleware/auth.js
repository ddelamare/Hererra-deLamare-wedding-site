module.exports = function(req, res, next) {
  var id = req.query.id;

  if (id === 'letmein') {
    next()
  } else {
    res.redirect('/login');
  }
}
