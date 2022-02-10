'use strict';

const express = require('express');
const materialsRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving',
    timezone: 'utc'
});

materialsRouter.get('/findAll', function (request, response) {
    let sql = `select * from materials`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

module.exports = materialsRouter;