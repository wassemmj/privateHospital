const express = require('express') ;
const app = express() ;
const path = require('path');

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



app.use(express.json()) ;
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


app.listen(3000 , () => console.log('connected')) ;