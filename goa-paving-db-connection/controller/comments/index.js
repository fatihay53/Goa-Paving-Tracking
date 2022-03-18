'use strict';

const express = require('express');
const commentsRouter = express.Router();
const connection = require('../connection')

commentsRouter.get('/findAll', function (request, response) {
    var sql = `select *
               from comments`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

commentsRouter.post('/save', function (request, response) {
    let comment = request.body.comment;
    let estimateTemplateId = request.body.estimateTemplateId;
    let userId = request.body.userId;
    let createdDate = new Date();

    var sql = "INSERT INTO comments(comment, estimate_template_id,user_id,created_date) VALUES (?,?,?,?)";

    connection.query(sql, [comment, estimateTemplateId, userId,createdDate], function (error, rows) {
        if (error) throw error;
        response.end();
    });
});

commentsRouter.post('/findComments', function (request, response) {
    let estimateTemplateId = request.body.estimateTemplateId;

    var sql = `select *
               from comments a
                        join users u on a.user_id = u.id
                        join employee e on e.user_id = u.id
               where estimate_template_id = ${estimateTemplateId} order by created_date desc`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result);
        response.end();
    });
});

module.exports = commentsRouter;