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
const userRouter = require('./controller/user');
const timeCardRouter = require('./controller/time_card');
const jobTypeRouter = require('./controller/job_type');
const timeCardDetailRouter = require('./controller/time_card_detail');
const materialsRouter = require('./controller/materials');
const projectCategoryRouter = require('./controller/project_category');
const estimateTemplateRouter = require('./controller/estimate_template');
const preJobSafetyRouter = require('./controller/pre_job_safety_form');
const attachmentRouter = require('./controller/attachment');
const hospitalRouter = require('./controller/hospital');
const emergencyRouter = require('./controller/emergency_form');
const commentsRouter = require('./controller/comments');

var app = express();
app.use(cors())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use('/auth',authController);
app.use('/newClientForm',newClientFormController);
app.use('/employee',employeeRouter);
app.use('/tailGateTalkForm',tailGateTalkFormRouter);
app.use('/attendees',attendeesRouter);
app.use('/mail',mailRouter);
app.use('/user',userRouter);
app.use('/timeCard',timeCardRouter);
app.use('/jobType',jobTypeRouter);
app.use('/timeCardDetail',timeCardDetailRouter);
app.use('/materials',materialsRouter);
app.use('/projectCategory',projectCategoryRouter);
app.use('/estimateTemplate',estimateTemplateRouter);
app.use('/preJobSafety',preJobSafetyRouter);
app.use('/attachment',attachmentRouter);
app.use('/hospital',hospitalRouter);
app.use('/emergency',emergencyRouter);
app.use('/comments',commentsRouter);

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});

app.listen(8080,()=>{
    console.log("Server is running...")
});