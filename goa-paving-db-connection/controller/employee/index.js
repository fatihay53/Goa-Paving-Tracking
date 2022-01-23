'use strict';

const express = require('express');
const employeeRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving'
});

employeeRouter.get('/findAll', function (request, response) {
    var sql = `select * from employee e join users u on e.user_id=u.id`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

employeeRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO employee (email, user_id,name,surname,employee_type) VALUES (?,?,?,?,?)`;
    let userId = request.body.userId;
    let name = request.body.firstName;
    let surname = request.body.lastName;
    let email = request.body.email;
    let employeeType = request.body.employeeType;

    connection.query(sql, [email, userId, name, surname,employeeType], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to employee. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

module.exports = employeeRouter;