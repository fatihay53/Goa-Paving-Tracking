'use strict';

const express = require('express');
const emergencyRouter = express.Router();
const connection = require('../connection')

emergencyRouter.get('/findAll', function (request, response) {
    var sql = `select
                   e.id,e.location,e.amPm,e.date,e.emergencyMeetingLocation,e.hour,e.methodOfCommunication,e.officeSiteContact,
                   e.phone as emergencyPhone,e.provincialGoverment,e.responseCheckList,e.site,e.siteSupervisor,
                   em.id as supervisorId,em.name as supervisorName,em.surname as supervisorSurname,
                   em1.id as employee1Id,em1.name as employee1Name,em1.surname as employee1Surname,
                   em2.id as employee2Id,em2.name as employee2Name,em2.surname as employee2Surname,
                   em3.id as employee3Id,em3.name as employee3Name,em3.surname as employee3Surname,
                   s3.id as supervisor3Id,s3.name as supervisor3Name,s3.surname as supervisor3Surname,
                   em4.id as employee4Id,em4.name as employee4Name,em4.surname as employee4Surname,
                   em5.id as employee5Id,em5.name as employee5Name,em5.surname as employee5Surname,
                   em6.id as employee6Id,em6.name as employee6Name,em6.surname as employee6Surname,
                   em7.id as employee7Id,em7.name as employee7Name,em7.surname as employee7Surname,
                   em8.id as employee8Id,em8.name as employee8Name,em8.surname as employee8Surname,
                   f.id as foremanId,f.name as foremanName,f.surname as foremanSurname,
                   h.id as hospitalId,h.name as hospitalName,h.phone,h.street,h.city,h.zip,
                   est.id as projectId,est.project_name as project_name
                   from emergency_form e join employee em
                   on e.supervisorId = em.id join employee em1
                   on e.employee1Id = em1.id join employee em2
                   on e.employee2Id = em2.id join employee em3
                   on e.employee3Id = em3.id join employee em4
                   on e.supervisor3Id = em4.id join employee s3
                   on e.employee4Id = s3.id join employee em5
                   on e.employee5Id = em5.id join employee em6
                   on e.employee6Id = em6.id join employee em7
                   on e.employee7Id = em7.id join employee em8
                   on e.employee8Id = em8.id join hospital h
                   on e.hospitalId = h.id join employee f 
                   on e.foremanId = f.id join estimate_template est
                   on e.projectId=est.id order by e.created_date desc`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

emergencyRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO emergency_form (projectId,supervisorId,foremanId, employee1Id,employee2Id,employee3Id,supervisor3Id,employee4Id,employee5Id,employee6Id,employee7Id,employee8Id,hospitalId,date,site,phone,methodOfCommunication,emergencyMeetingLocation,officeSiteContact,siteSupervisor,hour,amPm,location,responseCheckList,provincialGoverment,created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    let projectId = request.body.projectId;
    let supervisorId = request.body.supervisorId;
    let foremanId = request.body.foremanId;
    let employee1Id = request.body.employee1Id;
    let employee2Id = request.body.employee2Id;
    let employee3Id = request.body.employee3Id;
    let supervisor3Id = request.body.supervisor3Id;
    let employee4Id = request.body.employee4Id;
    let employee5Id = request.body.employee5Id;
    let employee6Id = request.body.employee6Id;
    let employee7Id = request.body.employee7Id;
    let employee8Id = request.body.employee8Id;
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

    connection.query(sql, [projectId,supervisorId,foremanId, employee1Id,employee2Id,employee3Id,supervisor3Id,employee4Id,employee5Id,employee6Id,employee7Id,employee8Id, hospitalId, date,site,phone,methodOfCommunication,emergencyMeetingLocation,officeSiteContact,siteSupervisor,hour,amPm,location,responseCheckList,provincialGoverment,createdDate], function (error, rows) {
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
    var sql = `UPDATE emergency_form set projectId = ?, supervisorId = ?,foremanId = ?,employee1Id = ?,employee2Id = ?,employee3Id = ?,supervisor3Id = ?,employee4Id = ?,employee5Id = ?,employee6Id = ?,employee7Id = ?,employee8Id = ?,hospitalId = ?,date =?,site=?,phone=?,methodOfCommunication=?,emergencyMeetingLocation=?,officeSiteContact=?,siteSupervisor=?,hour=?,amPm=?,location=?,provincialGoverment=?,responseCheckList=? where id = ${id}`;
    let projectId = request.body.projectId;
    let supervisorId = request.body.supervisorId;
    let foremanId = request.body.foremanId;
    let employee1Id = request.body.employee1Id;
    let employee2Id = request.body.employee2Id;
    let employee3Id = request.body.employee3Id;
    let supervisor3Id = request.body.supervisor3Id;
    let employee4Id = request.body.employee4Id;
    let employee5Id = request.body.employee5Id;
    let employee6Id = request.body.employee6Id;
    let employee7Id = request.body.employee7Id;
    let employee8Id = request.body.employee8Id;
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

    connection.query(sql, [projectId, supervisorId, foremanId, employee1Id,employee2Id,employee3Id,supervisor3Id,employee4Id,employee5Id,employee6Id,employee7Id,employee8Id,hospitalId,date,site,phone,methodOfCommunication,emergencyMeetingLocation,officeSiteContact,siteSupervisor,hour,amPm,location,provincialGoverment,responseCheckList], function (error, rows) {
        if (error) throw error;

        response.json({
            ...rows
        })

        response.end();
    });
});

module.exports = emergencyRouter;