'use strict';

const express = require('express');
const materialsRouter = express.Router();
const connection = require('../connection')

materialsRouter.get('/findAll', function (request, response) {
    let sql = `select * from materials`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

module.exports = materialsRouter;