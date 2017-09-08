var db = require('mongoose');
var config = require('../config');

db.connect(config.mongoUrl);

module.exports = db;