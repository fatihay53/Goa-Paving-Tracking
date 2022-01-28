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
    var sql = `INSERT INTO new_client_form (clientName,firstName,lastName,streetAddress,streetAddress2,city,province,postalCode,phoneNumber,email,created_date) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;
    let clientName = request.body.clientName;
    let firstName = request.body.firstName;
    let lastName = request.body.lastName;
    let streetAddress = request.body.streetAddress;
    let streetAddress2 = request.body.streetAddress2;
    let city = request.body.city;
    let province = request.body.province;
    let postalCode = request.body.postalCode;
    let phoneNumber = request.body.phoneNumber;
    let email = request.body.email;
    let createdDate = new Date();

    connection.query(sql, [clientName, firstName, lastName, streetAddress, streetAddress2, city, province, postalCode, phoneNumber, email,createdDate], function (error, rows) {
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
    var sql = `select * from new_client_form order by created_date desc`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});


module.exports = newClientFormRouter;