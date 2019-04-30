var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var GuestSchema = new Schema({
    name: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    maxSeats: Number,
    email: String

});


GuestSchema.pre('save', function(next) {
    var guest = this;

    // only hash the password if it has been modified (or is new)
    if (!guest.isModified('password')) return next();

    bcrypt.hash(guest.password, SALT_WORK_FACTOR).then(function(hash) {
      // override the cleartext password with the hashed one
      guest.password = hash;
      return next();
    });
});

GuestSchema.methods.comparePassword = function(candidatePassword, cb) {
    return bcrypt.compare(candidatePassword, this.password);
};

GuestSchema.statics.authenticate = function(id,password, sessionExists)
{
  return this.findOne({name: id}).then( (guest) => {
    if (!guest) return null;

    return sessionExists || guest.comparePassword(password).then(function(isMatch)
    {
      return isMatch? guest  :null;
    });
  });

}

module.exports = mongoose.model('Guest', GuestSchema);
