const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const mailsender = require("./config/email-config")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);

    // test code for email sender
    mailsender.sendMail({
        from:ServerConfig.GMAIL_EMAIL,
        to: 'siddanthe.edu@gmail.com',
        subject : "testing email service",
        text: "is email service working ?"
    })

});
