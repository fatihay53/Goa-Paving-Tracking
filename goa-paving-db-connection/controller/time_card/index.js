'use strict';

const express = require('express');
const timeCardRouter = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving'
});

timeCardRouter.get('/getTimeCardReport', function (request, response) {
    let sql = `select date,created_date,e.name,e.surname,total_hour_double,e.user_id from time_card t join employee e on t.user_id=e.user_id
 where date between Date('2022-01-27') and Date('2022-02-01') and is_approved=true  order by date asc`;

    let connectionNew = mysql.createConnection({
        host: '192.168.99.100',
        user: 'root',
        password: '123',
        database: 'goa_paving',
        timezone: 'GMT + 3'
    });

    connectionNew.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

timeCardRouter.get('/getTimeCardReportTotal', function (request, response) {
    let sql = `select e.user_id,e.name,e.surname,sum(total_hour_double) as total from time_card t join employee e on t.user_id=e.user_id
 where date between Date('2022-01-27') and Date('2022-02-01') and is_approved=true
 group by e.user_id,e.name,e.surname`;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

timeCardRouter.post('/findAll', function (request, response) {
    let userId = request.body.userId;
    let sql;
    if (userId !== null && userId !== undefined && userId !== '') {
        sql = `select t.id as time_card_id,t.*,u.*,e.* from time_card t join users u on t.user_id=u.id join employee e on u.id=e.user_id where u.id=${userId} order by created_date desc`;
    } else {//admin hepsini görecek
        sql = `select t.id as time_card_id,t.*,u.*,e.* from time_card t join users u on t.user_id=u.id join employee e on u.id=e.user_id order by created_date desc`;
    }

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

timeCardRouter.post('/approveTimeCard', function (request, response) {
    let timeCardId = request.body.timeCardId;
    let approvedUserId = request.body.approvedUserId;
    let sql = `update time_card set is_approved=true,approved_user_id=${approvedUserId} where id=` + timeCardId;

    connection.query(sql, function (error, result, fields) {
        if (error) throw error;
        response.json(result)
        response.end();
    });
});

function toDate(date) {
    var parts = date.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

timeCardRouter.post('/save', function (request, response) {
    var sql = `INSERT INTO time_card (date,start_hour,end_hour,total_hour,user_id,is_approved,signature,created_date,board_allowance,total_hour_double) VALUES (?,?,?,?,?,?,?,?,?,?)`;
    let date = toDate(request.body.date);
    let startHour = request.body.startHour;
    let endHour = request.body.endHour;
    let totalHour = request.body.totalHour;
    let userId = request.body.userId;
    let signature = request.body.signature;
    let boardAllowance = request.body.boardAllowance;
    let totalHourDouble = request.body.totalHourDouble;
    let created_date = new Date();

    connection.query(sql, [date, startHour, endHour, totalHour, userId, false, signature, created_date, boardAllowance, totalHourDouble], function (error, rows) {
        if (error) throw error;

        console.log("Row inserted to time_card. Id = "
            + rows.insertId);
        response.json({
            ...rows
        })

        response.end();
    });
});

module.exports = timeCardRouter;