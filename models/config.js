var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    const uuidv4 = require('uuid/v4');

    var Config = new Schema({
        secret: String,
        test: String
    });

    Config.statics.ensureConfig = function ()
    {
      if (global.config)
      {
        return;
      }
      return mongoose.model('Config', Config).findOne().then(function(config)
      {
        if (!config)
        {
          config = new mongoose.model('Config', Config)(
            {
              // randomize secret
              secret: uuidv4()
            });
            config.save(config);
        }

        global.config = config;
      });
    }


module.exports = mongoose.model('Config', Config);
