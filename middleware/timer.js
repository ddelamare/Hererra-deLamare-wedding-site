module.exports = function (req,res,next){
  const start = Date.now();
   // The 'finish' event will emit once the response is done sending
   res.once('finish', () => {
     // Emit an object that contains the original request and the elapsed time in MS
     console.log(req.originalUrl,'elapsedMS', Date.now() - start );
   });

   next();
};
