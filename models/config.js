var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    const { v4: uuidv4 } = require('uuid');

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
      return this.findOne().then(function(config)
      {
        if (!config)
        {
          config = new this(
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
