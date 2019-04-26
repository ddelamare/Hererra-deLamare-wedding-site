var express = require('express');
var exphbs  = require('express-handlebars');
const path = require('path');
const port = 8000

var app = express();

// Init handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Host static content
app.use('/content', express.static(path.join(__dirname, 'content')))

// Insert middleware for all requests
// This loads all user session data
app.use(require('./middleware/session'))

// Register all controllers
app.use('/', require('./controllers/home'));

app.listen(port, () => console.log(`Website listening on port ${port}`))
