var express = require('express');
var exphbs  = require('express-handlebars');
const path = require('path');
const db = require('./models/db')
const guestSchema = require('./models/guest')
const config = require('./models/config')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
const port = 8000

var app = express();

// Init handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Host static content
app.use('/content', express.static(path.join(__dirname, 'content')))

// Insert middleware for all requests
app.use(require('./middleware/timer'))

// Wait until db connection has been made
db.then(function(val)
{

  // Wait until config has been loaded
  config.ensureConfig().then(function ()
  {
    // This sets up the user session on every request
    app.use(session({
      name:'session',
      secret: global.config.secret,
      resave:false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      cookie : {
        maxAge: 30 * 86400 * 1000, // 1 Month
    }
    }));

    // Register all controllers
    app.use('/', require('./controllers/home'));

    app.listen(port, () => console.log(`Website listening on port ${port}`))
  });

});
