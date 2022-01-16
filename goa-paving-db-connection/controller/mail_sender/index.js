'use strict';
const express = require('express');
const mailRouter = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'ozanboyukk@gmail.com',
        pass: '',
    },
});

mailRouter.post('/send', function(request, response) {
    let attendees = request.body.attendees;
    let formId = request.body.formId;

    let path = `<a href=http://localhost:3000/signatureConfirmPage?formId=${formId}>Login App For Signature</a>`;
    attendees.map(elem=>{
        transporter.sendMail({
            from: 'ozanboyukk@gmail.com',
            to: elem.email,
            subject: "Tail Gate Talk Form Signature Confirm",
            text: "Please signature to attend form!",
            html: path,
        }).then(info => {
            console.log({info});
        }).catch(console.error);
    })
});

module.exports = mailRouter;