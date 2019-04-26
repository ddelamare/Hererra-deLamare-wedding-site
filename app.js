var express = require('express');
var exphbs  = require('express-handlebars');
const path = require('path');

var app = express();

// Init handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Host static content
app.use('/content', express.static(path.join(__dirname, 'content')))

app.get('/', function (req, res) {
   res.render('home');
});

app.listen(3000);
