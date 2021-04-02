// required libraries
const express = require('express');

const port = 8000;

// // to use layouts
// const expressLayouts = require('express-ejs-layouts');

const app = express();

// // use static files
// app.use(express.static('./assets'));

// // to extract styles and scripts of subpages in layouts
// app.set('layouts extractStyles',true);
// app.set('layouts extractScripts',true);

// app.use(expressLayouts);

// // set up view engine and views
// app.use('view engine','ejs');
// app.use('views', './views'); 

// use (main) express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){console.log(`Error in running the server: ${err}`);}

    console.log(`Express server is up and running on port: ${port}`);
});