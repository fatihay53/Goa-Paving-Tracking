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


module.exports = employeeRouter;