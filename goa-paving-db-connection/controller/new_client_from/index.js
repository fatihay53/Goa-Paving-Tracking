'use strict';

const express = require('express');
const newClientFormRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving'
});

newClientFormRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO new_client_form (clientName, date,firstName,lastName,streetAddress,streetAddress2,city,province,postalCode,phoneNumber,email) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    let clientName = request.body.clientName;
    let date = request.body.date;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let streetAddress = request.body.streetAddress;
    let streetAddress2 = request.body.streetAddress2;
    let city = request.body.city;
    let province = request.body.province;
    let postalCode = request.body.postalCode;
    let phoneNumber = request.body.phoneNumber;
    let email = request.body.email;


    connection.query(sql, [clientName, date, firstName, lastName, streetAddress, streetAddress2, city, province, postalCode, phoneNumber, email], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to new_client_from. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

newClientFormRouter.get('/findAll', function (request, response) {
    var sql = `select * from new_client_form`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});


module.exports = newClientFormRouter;