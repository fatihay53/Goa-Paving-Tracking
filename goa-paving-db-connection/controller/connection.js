var mysql = require('mysql');
module.exports = mysql.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: '123',
    database: 'goa_paving'
});

/*module.exports = mysql.createConnection({
    host: 'server311.web-hosting.com',
    user: 'fatiebny_goa_paving',
    password: 'xyO5nC7=blVF',
    database: 'fatiebny_goa_paving'
});*/
