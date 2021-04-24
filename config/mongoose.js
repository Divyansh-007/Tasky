// required libraries
const mongoose = require('mongoose');
const env = require('./environment');

// connecting database
mongoose.connect(env.db);

const db = mongoose.connection;

// checking connection
db.on('error',console.error.bind('error!!'));

db.once('open',function(){
    console.log('Successfully connected to database :: MongoDB');
});

module.exports = db;
