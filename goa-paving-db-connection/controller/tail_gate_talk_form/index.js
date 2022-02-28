'use strict';

const express = require('express');
const tailGateTalkFormRouter = express.Router();
const connection = require('../connection')

tailGateTalkFormRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO tail_gate_talk_form (date,location,firstNameForeman,lastNameForeman,signatureForeman,estimate_template_id,safetyTraining,employeeSuggestions,signature,title,subject,created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
    let date = request.body.date;
    let location = request.body.location;
    let firstNameForeman = request.body.firstNameForeman;
    let lastNameForeman = request.body.lastNameForeman;
    let signatureForeman = request.body.signatureForeman;
    let safetyTraining = request.body.safetyTraining;
    let employeeSuggestions = request.body.employeeSuggestions;
    let signature = request.body.signature;
    let title = request.body.title;
    let subject = request.body.subject;
    let estimateTemplateId = request.body.estimateTemplateId;
    let createdDate = new Date();

    connection.query(sql, [date, location, firstNameForeman, lastNameForeman, signatureForeman, estimateTemplateId, safetyTraining, employeeSuggestions, signature, title,subject,createdDate], function (error, rows) {
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
    var sql = `select p.*,e.project_name as project_name from tail_gate_talk_form p left join estimate_template e on p.estimate_template_id = e.id order by created_date desc`;

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