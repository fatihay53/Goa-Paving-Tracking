'use strict';

var mysql = require('mysql');

var con = mysql.createConnection({
    host     : '192.168.99.100',
    user     : 'root',
    password : '123',
    database : 'goa_paving'
});

module.exports = con;