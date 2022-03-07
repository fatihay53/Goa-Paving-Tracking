'use strict';
const express = require('express');
const mailRouter = express.Router();
const nodemailer = require('nodemailer');
const API_URL='http://localhost:3000';
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
    let formType = request.body.formType;

    let href = formType === 'TAIL_GATE_TALK_FORM' ? `${API_URL}/#/signatureConfirmPage?formId=${formId}`:
        formType === 'PRE_JOB_SAFETY_FORM' ? `${API_URL}/#/signatureConfirmPage/safety?formId=${formId}` :'';

    let subject = formType === 'TAIL_GATE_TALK_FORM' ? 'Tail Gate Talk Form Signature Confirm':
                  formType === 'PRE_JOB_SAFETY_FORM' ? 'Pre Job Safety Form Signature Confirm' :'';

    let path = `<a href=${href}>Login App For Signature</a>`;
    attendees.map(elem=>{
        transporter.sendMail({
            from: 'ozanboyukk@gmail.com',
            to: elem.email,
            subject: subject,
            text: "Please signature to attend form!",
            html: path,
        }).then(info => {
            console.log("Mail sended for ->"+elem.email);
        }).catch(console.error);
    })
});

module.exports = mailRouter;