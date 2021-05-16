const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access_log',{
    interval: '1d',
    path: logDirectory
});

const production = {
    name: 'production',
    assets_path: process.env.TASKY_ASSETS_PATH,
    session_cookie_secret: process.env.TASKY_SESSION_COOKIE_SECRET,
    db: process.env.TASKY_DB,
    smtp_transporter: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: 'false',
        auth:{
            user: process.env.TASKY_SMTP_AUTH_USER,
            pass: process.env.TASKY_SMTP_AUTH_PASS
        }
    },
    google_client_id: process.env.TASKY_G_CLIENT_ID,
    google_client_secret: process.env.TASKY_G_CLIENT_SECRET,
    google_callback_url : process.env.TASKY_G_CALLBACK_URL,
    morgan:{
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}

module.exports = production;
