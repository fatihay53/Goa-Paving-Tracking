'use strict';

const express = require('express');
const certificateRouter = express.Router();
const connection = require('../connection')

certificateRouter.post('/findAll', function (request, response) {
    let id = request.body.id;
    var sql = `select * from certificates where user_id=${id}`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

certificateRouter.post('/save', function (request, response) {
    let userId = request.body.id ;
    let files = request.body.files ;

    var sql = "INSERT INTO certificates (name, data,type,user_id) VALUES ?";

    connection.query(sql, [files.map(item => [item.name,item.data, item.type,userId])], function (error, rows) {
        if (error) throw error;
        response.end();
    });
});

module.exports = certificateRouter;