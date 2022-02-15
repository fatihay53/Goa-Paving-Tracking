'use strict';

const express = require('express');
const jobTypeRouter = express.Router();
const connection = require('../connection')

jobTypeRouter.get('/findAll', function (request, response) {
    let sql = `select * from job_type`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

module.exports = jobTypeRouter;