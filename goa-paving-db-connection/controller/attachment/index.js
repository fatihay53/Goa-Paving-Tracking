'use strict';

const express = require('express');
const attachmentRouter = express.Router();
const connection = require('../connection')

attachmentRouter.post('/findAll', function (request, response) {
    let id = request.body.id;
    var sql = `select * from attachment where estimate_template_id=${id}`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

attachmentRouter.post('/save', function (request, response) {
    let estimateTemplateId = request.body.estimateTemplateId ;
    let files = request.body.files ;

    var sql = "INSERT INTO attachment (name, data,type,estimate_template_id) VALUES ?";

    connection.query(sql, [files.map(item => [item.name,item.data, item.type,estimateTemplateId])], function (error, rows) {
        if (error) throw error;
        response.end();
    });
});

module.exports = attachmentRouter;