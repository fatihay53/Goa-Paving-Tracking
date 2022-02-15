'use strict';

const express = require('express');
const userRouter = express.Router();
const connection = require('../connection')

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
    var sql = `select u.id as user_id,e.id as employee_id,u.*,e.* from users u join employee e on u.id=e.user_id `;

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

userRouter.post('/update', function (request, response) {
    let id = request.body.id;
    var sql = `UPDATE users set username = ?, password = ?,role = ? where id = ${id}`;
    let userName = request.body.userName;
    let password = request.body.password;
    let role = request.body.role;

    connection.query(sql, [userName, password, role], function (error, rows) {
        if (error) throw error;

        response.json({
            ...rows
        })

        response.end();
    });
});

module.exports = userRouter;