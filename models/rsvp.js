var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    guestSchema = require('./guest');

var RsvpSchema = new Schema({
    guestFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    accepts: Boolean,
    numAdults: Number,
    numChildren: Number,
    comments: String,
    submitted: Boolean
});

// Find by guest or create an empty one
RsvpSchema.statics.getByGuest = function(guest)
{
  return this.findOne({guestFor: guest._id}).then(function(rsvp)
  {
    if (rsvp){
      return rsvp;
    }
    else {
    return new mongoose.model('Rsvp', RsvpSchema)({
        guestFor: guest._id,
        numAdults: 0,
        numChildren:0,
        submitted: false
      });
    }
  });
}

RsvpSchema.methods.validateRsvp = function(guest) {
    return this.numAdults + this.numChildren <= guest.maxSeats;
};

module.exports = mongoose.model('Rsvp', RsvpSchema);
