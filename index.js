const express = require('express') ;
const app = express() ;
const path = require('path');

const doctor = require('./routes/user_routes/doctors') ;
const nurse = require('./routes/user_routes/nurses') ;
const nonMedical = require('./routes/user_routes/nonMedicals') ;
const specialist = require('./routes/hospital_routes/specialists_routes') ;
const nonSpecialist = require('./routes/hospital_routes/nonMedical_specialist_routes') ;

app.use(express.json()) ;
app.use('/api/doctors' , doctor) ;
app.use('/api/nurses' , nurse) ;
app.use('/api/nonMedicals' , nonMedical) ;
app.use('/api/specialists' , specialist) ;
app.use('/api/nonSpecialists' , nonSpecialist) ;

app.listen(3000 , () => console.log('connected')) ;