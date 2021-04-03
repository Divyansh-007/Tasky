// required libraries
const mongoose = require('mongoose');

// connecting database
mongoose.connect('mongodb+srv://divyansh:divyansh@cluster0.exyj1.mongodb.net/tasky-development');

const db = mongoose.connection;

// checking connection
db.on('error',console.error.bind('error!!'));

db.once('open',function(){
    console.log('Successfully connected to database :: MongoDB');
});

module.exports = db;
