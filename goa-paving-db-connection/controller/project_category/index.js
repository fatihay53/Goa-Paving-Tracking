'use strict';

const express = require('express');
const projectCategoryRouter = express.Router();
const connection = require('../connection')

projectCategoryRouter.get('/findAll', function (request, response) {
    let sql = `select * from project_category`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

module.exports = projectCategoryRouter;