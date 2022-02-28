'use strict';

const express = require('express');
const attendeesRouter = express.Router();
const connection = require('../connection')

attendeesRouter.get('/findAll', function (request, response) {
    var sql = `select * from attendees`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

attendeesRouter.post('/save', function (request, response) {
    let attendees = request.body.attendees ;
    let formId = request.body.formId ;
    let formType = request.body.formType ;

    var sql = "INSERT INTO attendees (form_id, user_id,form_type) VALUES ?";

    connection.query(sql, [attendees.map(item => [formId, item.user_id,formType])], function (error, rows) {
        if (error) throw error;
        response.end();
    });
});

attendeesRouter.post('/updateSignature', function (request, response) {
    let formId = request.body.formId;
    let userId = request.body.userId;
    let signature = request.body.signature;
    let isApproval = request.body.isApproval;
    let formType = request.body.formType;

    var sql = `update attendees set signature='${signature}', is_approval=${isApproval} where form_id=${formId} and form_type='${formType}' and user_id=${userId}`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.end();
    });
});

attendeesRouter.post('/findAttendees', function (request, response) {
    let formId = request.body.formId;
    let formType = request.body.formType;

    var sql = `select * from attendees a join users u on a.user_id=u.id join employee e on e.user_id=u.id where form_id=${formId} and form_type='${formType}'`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result);
        response.end();
    });
});

module.exports = attendeesRouter;