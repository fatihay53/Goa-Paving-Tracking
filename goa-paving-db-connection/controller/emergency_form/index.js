'use strict';

const express = require('express');
const emergencyRouter = express.Router();
const connection = require('../connection')

emergencyRouter.get('/findAll', function (request, response) {
    var sql = `select
                   e.id,e.location,e.amPm,e.date,e.emergencyMeetingLocation,e.hour,e.methodOfCommunication,e.officeSiteContact,
                   e.phone as emergencyPhone,e.provincialGoverment,e.responseCheckList,e.site,e.siteSupervisor,
                   em.id as supervisorId,em.name as supervisorName,em.surname as supervisorSurname,
                   em1.id as employeeId,em1.name as employeeName,em1.surname as employeeSurname,
                   em2.id as foremanId,em2.name as foremanName,em2.surname as foremanSurname,
                   h.id as hospitalId,h.name as hospitalName,h.phone,h.street,h.city,h.zip,
                   est.id as projectId,est.project_name as project_name
                   from emergency_form e join employee em
                   on e.supervisorId = em.id join employee em1
                   on e.employeeId = em1.id join hospital h
                   on e.hospitalId = h.id join employee em2 
                   on e.foremanId = em2.id join estimate_template est
                   on e.projectId=est.id`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

emergencyRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO emergency_form (projectId,supervisorId,foremanId, employeeId,hospitalId,date,site,phone,methodOfCommunication,emergencyMeetingLocation,officeSiteContact,siteSupervisor,hour,amPm,location,responseCheckList,provincialGoverment,created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    let projectId = request.body.projectId;
    let supervisorId = request.body.supervisorId;
    let foremanId = request.body.foremanId;
    let employeeId = request.body.employeeId;
    let hospitalId = request.body.hospitalId;
    let date = new Date(request.body.date);
    let site = request.body.site;
    let phone = request.body.emergencyPhone;
    let methodOfCommunication = request.body.methodOfCommunication;
    let emergencyMeetingLocation = request.body.emergencyMeetingLocation;
    let officeSiteContact = request.body.officeSiteContact;
    let siteSupervisor = request.body.siteSupervisor;
    let hour = request.body.hour;
    let amPm = request.body.amPm;
    let location = request.body.location;
    let provincialGoverment = JSON.stringify(request.body.provincialGoverment);
    let responseCheckList = JSON.stringify(request.body.responseCheckList);
    let createdDate = new Date();

    connection.query(sql, [projectId,supervisorId,foremanId, employeeId, hospitalId, date,site,phone,methodOfCommunication,emergencyMeetingLocation,officeSiteContact,siteSupervisor,hour,amPm,location,responseCheckList,provincialGoverment,createdDate], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to emergency_form. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

emergencyRouter.post('/update', function (request, response) {
    let id = request.body.id;
    var sql = `UPDATE emergency_form set projectId = ?, supervisorId = ?,foremanId = ?,employeeId = ?,hospitalId = ?,date =?,site=?,phone=?,methodOfCommunication=?,emergencyMeetingLocation=?,officeSiteContact=?,siteSupervisor=?,hour=?,amPm=?,location=?,provincialGoverment=?,responseCheckList=? where id = ${id}`;
    let projectId = request.body.projectId;
    let supervisorId = request.body.supervisorId;
    let foremanId = request.body.foremanId;
    let employeeId = request.body.employeeId;
    let hospitalId = request.body.hospitalId;
    let date = new Date(request.body.date);
    let site = request.body.site;
    let phone = request.body.emergencyPhone;
    let methodOfCommunication = request.body.methodOfCommunication;
    let emergencyMeetingLocation = request.body.emergencyMeetingLocation;
    let officeSiteContact = request.body.officeSiteContact;
    let siteSupervisor = request.body.siteSupervisor;
    let hour = request.body.hour;
    let amPm = request.body.amPm;
    let location = request.body.location;
    let provincialGoverment = JSON.stringify(request.body.provincialGoverment);
    let responseCheckList = JSON.stringify(request.body.responseCheckList);

    connection.query(sql, [projectId, supervisorId, foremanId, employeeId,hospitalId,date,site,phone,methodOfCommunication,emergencyMeetingLocation,officeSiteContact,siteSupervisor,hour,amPm,location,provincialGoverment,responseCheckList], function (error, rows) {
        if (error) throw error;

        response.json({
            ...rows
        })

        response.end();
    });
});

module.exports = emergencyRouter;