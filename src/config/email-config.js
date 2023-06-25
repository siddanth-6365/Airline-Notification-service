const nodemailer = require('nodemailer')

const { GMAIL_APP_PASSWORD , GMAIL_EMAIL} = require('./server-config')

const mailsender = nodemailer.createTransport({
    service:'GMAIL',
    auth:{
        user:GMAIL_EMAIL,
        pass:GMAIL_APP_PASSWORD
    }
})

module.exports = mailsender;