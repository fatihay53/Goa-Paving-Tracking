var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors')
const authController = require('./controller/auth');
const newClientFormController = require('./controller/new_client_from');
const employeeRouter = require('./controller/employee');
const tailGateTalkFormRouter = require('./controller/tail_gate_talk_form');
const attendeesRouter = require('./controller/attendees');
const mailRouter = require('./controller/mail_sender');

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
app.use('/employee',employeeRouter);
app.use('/tailGateTalkForm',tailGateTalkFormRouter);
app.use('/attendees',attendeesRouter);
app.use('/mail',mailRouter);

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.listen(8080,()=>{
    console.log("Server is running...")
});