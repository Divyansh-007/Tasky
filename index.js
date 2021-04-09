// required libraries
const express = require('express');

// for cookie
const cookieParser = require('cookie-parser');

const port = 8000;

// to use layouts
const expressLayouts = require('express-ejs-layouts');

const app = express();

// connecting database
const db = require('./config/mongoose');

// for cookie session
const session = require('express-session');

// for authentication using passport.js
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// to store cookie so as not to loose the user if server restarts
const mongoStore = require('connect-mongo');

// to use sass
const sassMiddleware = require('node-sass-middleware');

// for flash messages
const flash = require('connect-flash');

// to use middleware for flash messages
const customMware = require('./config/middleware');

// using sass middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

// to use encoded input data and cookie
app.use(express.urlencoded());
app.use(cookieParser()); 

// use static files
app.use(express.static('./assets'));

// to extract styles and scripts of subpages in layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express layouts
app.use(expressLayouts);

// set up view engine and views
app.set('view engine','ejs');
app.set('views', './views'); 

// authentication
app.use(session({
    name: 'tasky',
    secret: 'blahblahblah',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    // using mongo store
    store: mongoStore.create(
        {
            mongoUrl: 'mongodb+srv://divyansh:divyansh@cluster0.exyj1.mongodb.net/tasky-development',
            autoRemove: 'disabled'
        }
    )
}));

// initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// using flash after session as it uses session cookies
app.use(flash());

// using middleware for flash messages
app.use(customMware.setFlash);

// setting authenticated user
app.use(passport.setAuthenticatedUser);

// use (main) express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){console.log(`Error in running the server: ${err}`);}

    console.log(`Express server is up and running on port: ${port}`);
});