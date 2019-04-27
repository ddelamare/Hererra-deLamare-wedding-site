// Connection to database
var env = process.env.NODE_ENV || 'dev';
var mongoose = require('mongoose')
var config =  require('../config/' + 'dev' + '.js');
var db = mongoose.connect('mongodb://' + config.mongo.uri + '/' + config.mongo.db, { useNewUrlParser: true });




module.exports = db;
