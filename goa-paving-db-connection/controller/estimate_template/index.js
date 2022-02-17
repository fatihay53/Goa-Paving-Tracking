'use strict';

const express = require('express');
const estimateTemplateRouter = express.Router();
var moment = require('moment');
const connection = require('../connection')
const connectiongmt3 = require('../connectiongmt3')

const dateFormat = "YYYY-MM-DD HH:mm:ss";

estimateTemplateRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO estimate_template (date,project_name,project_category_id,estimate_project_hour,total_m2,subcontractor_json,external_rent_json,internal_rent_json,equipment_cost_json,cold_milling_json,traffic_control_json,employee_json,materials_json,bid,profit,created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
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
    let profit  = request.body.profit;
    let date  = request.body.date;

    let materials  = JSON.stringify(request.body.materials);
    let createdDate = new Date();

    connection.query(sql, [date,projectName, categoryId, estimateProjectHour,totalM2,subContractor, externalRent, internalRent, equipmentCost, coldMilling, trafficControl,employee,materials,bid,profit,createdDate], function (error, rows) {
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
    let profit  = request.body.profit;
    let date  = request.body.date;

    let createdDate = new Date();

    var sql = `UPDATE estimate_template set date =?,project_name = ?,project_category_id = ?,estimate_project_hour = ?,total_m2 = ?,subcontractor_json = ?,external_rent_json = ?,internal_rent_json = ?,equipment_cost_json = ?,cold_milling_json = ?,traffic_control_json = ?,employee_json = ?,materials_json = ?,bid = ?,profit=?,created_date = ? where id =${id}`;

    connection.query(sql, [date,projectName, categoryId, estimateProjectHour,totalM2,subContractor, externalRent, internalRent, equipmentCost, coldMilling, trafficControl,employee,materials,bid,profit,createdDate], function (error, rows) {
        if (error) throw error;

        console.log("Row updated to estimate_template = " + id);

        response.end();
    });
});

estimateTemplateRouter.post('/updateForemanData', function (request, response) {
    let id = request.body.id;
    let employeeForemanData = JSON.stringify(request.body.employeeForemanData);

    var sql = `UPDATE estimate_template set employee_foreman_json = '${employeeForemanData}' where id =${id}`;

    connection.query(sql, function (error, rows) {
        if (error) throw error;

        console.log("Row updated to estimate_template = " + id);

        response.end();
    });
});

estimateTemplateRouter.get('/findAll', function (request, response) {
    var sql = `select e.id as estimate_template_id,p.name as project_category_name,e.* from estimate_template e join project_category p on e.project_category_id=p.id order by created_date desc`;

    connectiongmt3.query(sql, function (error, result, fields) {
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


estimateTemplateRouter.post('/findUserTodayHours', function (request, response) {
    let userId = request.body.userId;
    let now = moment();

    let start = now.startOf('day').format(dateFormat);
    let end = now.endOf('day').format(dateFormat);

    let sql = `SELECT * FROM estimate_template WHERE json_contains(\`employee_json\`, '{"id":${userId}}') 
                and created_date between '${start}' and '${end}';`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});


estimateTemplateRouter.post('/getProfitReportDaily', function (request, response) {
    let startDate = request.body.startDate;
    let endDate = request.body.endDate;
    let sql = `select date,p.name,sum(profit) sumProfit from estimate_template e join project_category p on e.project_category_id=p.id 
  where date between Date('${startDate}') and Date('${endDate}') group by date,p.name  order by date asc`;

    connectiongmt3.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

estimateTemplateRouter.post('/getProfitReportTotal', function (request, response) {
    let startDate = request.body.startDate;
    let endDate = request.body.endDate;
    let sql = `select p.name,sum(profit) sumProfit from estimate_template e join project_category p on e.project_category_id=p.id
     where date between Date('${startDate}') and Date('${endDate}') group by p.name`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});


module.exports = estimateTemplateRouter;