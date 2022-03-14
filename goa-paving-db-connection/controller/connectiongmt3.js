var mysql =  require('mysql');
//createPool denedim
module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'goa_paving',
    timezone: 'GMT + 3'
})

/*module.exports = mysql.createConnection({
    host: 'server311.web-hosting.com',
    user: 'fatiebny_goa_paving',
    password: 'xyO5nC7=blVF',
    database: 'fatiebny_goa_paving',
    timezone: 'GMT + 3'
});*/
