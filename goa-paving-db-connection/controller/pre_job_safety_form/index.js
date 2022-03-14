'use strict';

const express = require('express');
const preJobSafetyRouter = express.Router();
const connection = require('../connection');
const connectiongmt3 = require('../connectiongmt3');

preJobSafetyRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO pre_job_safety_form (date,location,firstNameForeman,lastNameForeman,signatureForeman,estimate_template_id,general_options,environment_options,hazardous_options,others,task_list,possible_hazard_list,hazard_control_list,created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    let date = new Date(request.body.date);
    let location = request.body.location;
    let firstNameForeman = request.body.firstNameForeman;
    let lastNameForeman = request.body.lastNameForeman;
    let signatureForeman = request.body.signatureForeman;
    let estimateTemplateId = request.body.estimateTemplateId;
    let generalOptions  = JSON.stringify(request.body.generalOptions);
    let environmentOptions  = JSON.stringify(request.body.environmentOptions);
    let hazardousOptions  = JSON.stringify(request.body.hazardousOptions);
    let others = request.body.others;
    let taskList  = JSON.stringify(request.body.taskList);
    let possibleHazardList  = JSON.stringify(request.body.possibleHazardList);
    let hazardControlList  = JSON.stringify(request.body.hazardControlList);
    let createdDate = new Date();

    connection.query(sql, [date, location, firstNameForeman, lastNameForeman, signatureForeman, estimateTemplateId, generalOptions, environmentOptions, hazardousOptions, others,taskList,possibleHazardList,hazardControlList,createdDate], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to pre_job_safety_form. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

preJobSafetyRouter.get('/findAll', function (request, response) {
    var sql = `select p.*,e.project_name as project_name from pre_job_safety_form p left join estimate_template e on p.estimate_template_id = e.id order by created_date desc`;

    connectiongmt3.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

preJobSafetyRouter.post('/findById', function (request, response) {
    let formId = request.body.formId;
    var sql = `select * from pre_job_safety_form where id=`+formId;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});


module.exports = preJobSafetyRouter;