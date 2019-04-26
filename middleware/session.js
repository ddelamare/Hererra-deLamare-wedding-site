module.exports = function (req,res,next){
  req.user = "me";
  next();
};
