'use strict';

const express = require('express');
const tailGateTalkFormRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving'
});

tailGateTalkFormRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO tail_gate_talk_form (date,location,firstNameForeman,lastNameForeman,signatureForeman,job,safetyTraining,employeeSuggestions,signature,title,subject) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    let date = request.body.date;
    let location = request.body.location;
    let firstNameForeman = request.body.firstNameForeman;
    let lastNameForeman = request.body.lastNameForeman;
    let signatureForeman = request.body.signatureForeman;
    let job = request.body.job;
    let safetyTraining = request.body.safetyTraining;
    let employeeSuggestions = request.body.employeeSuggestions;
    let signature = request.body.signature;
    let title = request.body.title;
    let subject = request.body.subject;

    connection.query(sql, [date, location, firstNameForeman, lastNameForeman, signatureForeman, job, safetyTraining, employeeSuggestions, signature, title,subject], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to tail_gate_talk_form. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

tailGateTalkFormRouter.get('/findAll', function (request, response) {
    var sql = `select * from tail_gate_talk_form`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

tailGateTalkFormRouter.post('/findById', function (request, response) {
    let formId = request.body.formId;
    var sql = `select * from tail_gate_talk_form where id=`+formId;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});


module.exports = tailGateTalkFormRouter;