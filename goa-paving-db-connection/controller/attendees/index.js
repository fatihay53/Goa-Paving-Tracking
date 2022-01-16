'use strict';

const express = require('express');
const attendeesRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving'
});

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

    var sql = "INSERT INTO attendees (form_id, user_id) VALUES ?";

    connection.query(sql, [attendees.map(item => [formId, item.user_id])], function (error, rows) {
        if (error) throw error;
        response.end();
    });
});

attendeesRouter.post('/updateSignature', function (request, response) {
    let formId = request.body.formId;
    let userId = request.body.userId;
    let signature = request.body.signature;

    var sql = `update attendees set signature='${signature}' where form_id=`+formId+` and user_id=`+userId;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.end();
    });
});

attendeesRouter.post('/findAttendees', function (request, response) {
    let formId = request.body.formId;
    let userId = request.body.userId;

    var sql = `select * from attendees a join users u on a.user_id=u.id join employee e on e.user_id=u.id where form_id=`+formId+` and a.user_id=`+userId;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result);
        response.end();
    });
});

module.exports = attendeesRouter;