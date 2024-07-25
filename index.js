const express = require('express') ;
const app = express() ;
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const server = http.createServer(app);
const io = socketIo(server);

const user = require('./routes/user_routes/users') ;
const doctor = require('./routes/user_routes/doctors') ;
const nurse = require('./routes/user_routes/nurses') ;
const nonMedical = require('./routes/user_routes/nonMedicals') ;
const specialist = require('./routes/hospital_routes/specialists') ;
const nonSpecialist = require('./routes/hospital_routes/nonMedicalSpecialists') ;
const patient = require('./routes/patient_routes/patient_auth_routes');
const working = require('./routes/medical_routes/WorkingTime');
const nurseWorking = require('./routes/medical_routes/NurseWorkingTimes');
const clinical = require('./routes/clinical_forms/clinical_examination_routes');
const generalInformation = require('./routes/clinical_forms/general_information');
const othersystem = require('./routes/clinical_forms/other_system');
const clinicalForm = require('./routes/clinical_forms/clinical_forms_routes');
const information = require('./routes/information_routes/information_routes');
const notification = require('./routes/notification_routes/notification_routes');
const consults = require('./routes/consults_routes/consults_routes');
const examinations = require('./routes/examintaion_routes/examinations_routes');

app.use(express.json()) ;
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api' , user) ;
app.use('/api/doctors' , doctor) ;
app.use('/api/nurses' , nurse) ;
app.use('/api/nonMedicals' , nonMedical) ;
app.use('/api/specialists' , specialist) ;
app.use('/api/nonSpecialists' , nonSpecialist) ;
app.use('/api/patient' , patient) ;
app.use('/api/working' , working) ;
app.use('/api/nurseWorking' , nurseWorking) ;
app.use('/api/clinical' , clinical) ;
app.use('/api/generalInformation' , generalInformation) ;
app.use('/api/othersystem' , othersystem) ;
app.use('/api/clinicalForm' , clinicalForm) ;
app.use('/api/information' , information) ;
app.use('/api/notification' , notification) ;
app.use('/api/consults' , consults(io)) ;
app.use('/api/examinations' , examinations(io)) ;

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (doctorId) => {
        socket.join(doctorId);
        console.log(`Doctor with ID ${doctorId} joined room ${doctorId}`);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});