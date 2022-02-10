'use strict';

const express = require('express');
const estimateTemplateRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving'
});

estimateTemplateRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO estimate_template (project_name,project_category_id,estimate_project_hour,total_m2,subcontractor_json,external_rent_json,internal_rent_json,equipment_cost_json,cold_milling_json,traffic_control_json,employee_json,materials_json,bid,created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    let projectName = request.body.projectName;
    let categoryId = request.body.categoryId;
    let estimateProjectHour = request.body.estimateProjectHour;
    let totalM2 = request.body.totalM2;
    let subContractor  = JSON.stringify(request.body.subContractor);
    let externalRent  = JSON.stringify(request.body.externalRent);
    let internalRent  = JSON.stringify(request.body.internalRent);
    let equipmentCost  = JSON.stringify(request.body.equipmentCost);
    let coldMilling  = JSON.stringify(request.body.coldMilling);
    let trafficControl  = JSON.stringify(request.body.trafficControl);
    let bid  = JSON.stringify(request.body.bid);
    let employee  = JSON.stringify(request.body.employee);

    let materials  = JSON.stringify(request.body.materials);
    let createdDate = new Date();

    connection.query(sql, [projectName, categoryId, estimateProjectHour,totalM2,subContractor, externalRent, internalRent, equipmentCost, coldMilling, trafficControl,employee,materials,bid,createdDate], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to estimate_template. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

estimateTemplateRouter.post('/update', function (request, response) {
    let id = request.body.id;
    let projectName = request.body.projectName;
    let categoryId = request.body.categoryId;
    let estimateProjectHour = request.body.estimateProjectHour;
    let totalM2 = request.body.totalM2;
    let subContractor  = JSON.stringify(request.body.subContractor);
    let externalRent  = JSON.stringify(request.body.externalRent);
    let internalRent  = JSON.stringify(request.body.internalRent);
    let equipmentCost  = JSON.stringify(request.body.equipmentCost);
    let coldMilling  = JSON.stringify(request.body.coldMilling);
    let trafficControl  = JSON.stringify(request.body.trafficControl);
    let bid  = JSON.stringify(request.body.bid);
    let employee  = JSON.stringify(request.body.employee);
    let materials  = JSON.stringify(request.body.materials);

    let createdDate = new Date();

    var sql = `UPDATE estimate_template set project_name = ?,project_category_id = ?,estimate_project_hour = ?,total_m2 = ?,subcontractor_json = ?,external_rent_json = ?,internal_rent_json = ?,equipment_cost_json = ?,cold_milling_json = ?,traffic_control_json = ?,employee_json = ?,materials_json = ?,bid = ?,created_date = ? where id =${id}`;

    connection.query(sql, [projectName, categoryId, estimateProjectHour,totalM2,subContractor, externalRent, internalRent, equipmentCost, coldMilling, trafficControl,employee,materials,bid,createdDate], function (error, rows) {
        if (error) throw error;

        console.log("Row updated to estimate_template = " + id);

        response.end();
    });
});

estimateTemplateRouter.get('/findAll', function (request, response) {
    var sql = `select e.id as estimate_template_id,p.name as project_category_name,e.* from estimate_template e join project_category p on e.project_category_id=p.id order by created_date desc`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

estimateTemplateRouter.post('/findById', function (request, response) {
    let formId = request.body.formId;
    var sql = `select * from estimate_template where id=`+formId;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

estimateTemplateRouter.post('/findByProjectName', function (request, response) {
    let projectName = request.body.projectName;
    var sql = `select * from estimate_template where project_name='${projectName}'`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});


module.exports = estimateTemplateRouter;