'use strict';

const express = require('express');
const userRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving'
});

userRouter.post('/findByUserName', function (request, response) {
    let userName = request.body.userName;
    var sql = `select * from users where username='${userName}'`;

    connection.query(sql, function (error, result, fields) {
        //if (error) throw error;
        response.json(result)
        response.end();
    });
});


userRouter.get('/findAll', function (request, response) {
    var sql = `select * from users`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

userRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO users (username, password,role) VALUES (?,?,?)`;
    let userName = request.body.userName;
    let password = request.body.password;
    let role = request.body.role;

    connection.query(sql, [userName, password, role], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to user. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

module.exports = userRouter;