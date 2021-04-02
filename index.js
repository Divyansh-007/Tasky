// required libraries
const express = require('express');

const port = 8000;

// to use layouts
const expressLayouts = require('express-ejs-layouts');

const app = express();

// to use sass
const sassMiddleware = require('node-sass-middleware');

// using sass middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


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

// use (main) express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){console.log(`Error in running the server: ${err}`);}

    console.log(`Express server is up and running on port: ${port}`);
});