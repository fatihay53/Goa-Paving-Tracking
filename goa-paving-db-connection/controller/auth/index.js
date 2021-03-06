'use strict';
const express = require('express');
const authRouter = express.Router();
const connection = require('../connection')

authRouter.post('/login', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT u.id as user_id,u.*,e.* FROM users u left join employee e on u.id=e.user_id WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                let user = results[0];
                response.json({
                    session:{
                        loggedin:true,
                        user:{
                            username:user.username,
                            name:user.name,
                            surname:user.surname,
                            userId:user.user_id,
                            role: user.role
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