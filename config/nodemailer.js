const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');

let transporter = nodeMailer.createTransport(env.smtp_transpoter);

let renderTemplate = (data, relativePath) => {
    let mainHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template',err); return;}

            mainHTML = template;
        }
    );

    return mainHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}