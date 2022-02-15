'use strict';

const express = require('express');
const timeCardDetailRouter = express.Router();
const connection = require('../connection')

timeCardDetailRouter.get('/findAll', function (request, response) {
    var sql = `select * from time_card_detail`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

timeCardDetailRouter.post('/save', function (request, response) {
    let detail = request.body.detail ;
    let timeCardId = detail.timeCardId ;

    var sql = "INSERT INTO time_card_detail (time_card_id, job_type_id,hour) VALUES ?";

    connection.query(sql, [detail.jobDetail.map(item => [timeCardId, item.job_type_id, item.hour])], function (error, rows) {
        if (error) throw error;
        response.end();
    });
});

module.exports = timeCardDetailRouter;