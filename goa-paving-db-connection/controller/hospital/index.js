'use strict';

const express = require('express');
const hospitalRouter = express.Router();
const connection = require('../connection')

hospitalRouter.get('/findAll', function (request, response) {
    var sql = `select * from hospital`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

hospitalRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO hospital (name, phone,street,city,zip) VALUES (?,?,?,?,?)`;
    let name = request.body.name;
    let phone = request.body.phone;
    let street = request.body.street;
    let city = request.body.city;
    let zip = request.body.zip;

    connection.query(sql, [name, phone, street,city,zip], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to hospital. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

hospitalRouter.post('/update', function (request, response) {
    let id = request.body.id;
    var sql = `UPDATE hospital set name = ?, phone = ?,street = ?,city = ?,zip = ? where id = ${id}`;
    let name = request.body.name;
    let phone = request.body.phone;
    let street = request.body.street;
    let city = request.body.city;
    let zip = request.body.zip;

    connection.query(sql, [name, phone, street, city, zip], function (error, rows) {
        if (error) throw error;

        response.json({
            ...rows
        })

        response.end();
    });
});

module.exports = hospitalRouter;