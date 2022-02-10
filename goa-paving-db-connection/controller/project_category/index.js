'use strict';

const express = require('express');
const projectCategoryRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving',
    timezone: 'utc'
});

projectCategoryRouter.get('/findAll', function (request, response) {
    let sql = `select * from project_category`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

module.exports = projectCategoryRouter;