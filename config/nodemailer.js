const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'developer.jsw',
        pass: 'jswDeveloper@4321'
    }
});

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