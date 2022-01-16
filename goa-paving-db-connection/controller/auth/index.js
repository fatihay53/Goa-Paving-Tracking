'use strict';
const express = require('express');
const authRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '192.168.99.100',
    user     : 'root',
    password : '123',
    database : 'goa_paving'
});

authRouter.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                let user = results[0];
                response.json({
                    session:{
                        loggedin:true,
                        user:{
                            username:user.username,
                            name:user.name,
                            surname:user.surname,
                            userId:user.id
                        },
                        role:user.role
                    },
                    redirectUrl : '/dashboard'
                })
            } else {
                response.json({
                    auth:"INCORRECT_USER_INFOS"
                })
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});

module.exports = authRouter;