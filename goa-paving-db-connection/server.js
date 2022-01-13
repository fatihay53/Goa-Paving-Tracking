var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors')
const authController = require('./controller/auth');
const newClientFormController = require('./controller/new_client_from');

var app = express();
app.use(cors())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use('/auth',authController);
app.use('/newClientForm',newClientFormController);

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.listen(8080,()=>{
    console.log("Server is running...")
});