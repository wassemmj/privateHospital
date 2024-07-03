const express = require('express') ;
const router = express.Router() ;

const consults = require('../../controller/consults_controller/consults_controller');

const doctorMidl = require('../../middleware/doctor_middleware');


module.exports = (io) => {
    router.post('/:id' , doctorMidl, consults.makeConsults(io)) ;
    router.post('/response/:id' , doctorMidl, consults.addResponse) ;
    return router ;
} ;