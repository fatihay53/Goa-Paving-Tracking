'use strict';

const express = require('express');
const employeeRouter = express.Router();
const connection = require('../connection')

employeeRouter.get('/findAll', function (request, response) {
    var sql = `select * from employee e join users u on e.user_id=u.id`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

employeeRouter.get('/findAllEmployees', function (request, response) {
    var sql = `select * from employee e join users u on e.user_id=u.id where employee_type='EMPLOYEE'`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

employeeRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO employee (email, user_id,name,surname,employee_type,hourly_cost) VALUES (?,?,?,?,?,?)`;
    let userId = request.body.userId;
    let name = request.body.firstName;
    let surname = request.body.lastName;
    let email = request.body.email;
    let employeeType = request.body.employeeType;
    let hourlyCost = request.body.hourly_cost;
    if (hourlyCost == null || hourlyCost == undefined || hourlyCost == ''){
        hourlyCost = 0;
    }

    connection.query(sql, [email, userId, name, surname,employeeType,hourlyCost], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to employee. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

employeeRouter.post('/update', function (request, response) {
    let id = request.body.id;
    var sql = `UPDATE employee set email = ?, user_id = ?,name = ?,surname = ?,employee_type = ?,hourly_cost =? where id = ${id}`;
    let userId = request.body.userId;
    let name = request.body.firstName;
    let surname = request.body.lastName;
    let email = request.body.email;
    let employeeType = request.body.employeeType;
    let hourlyCost = request.body.hourly_cost;

    connection.query(sql, [email, userId, name, surname,employeeType,hourlyCost], function (error, rows) {
        if (error) throw error;

        response.json({
            ...rows
        })

        response.end();
    });
});

module.exports = employeeRouter;