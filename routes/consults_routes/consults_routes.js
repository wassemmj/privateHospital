const express = require('express') ;
const router = express.Router() ;

const consults = require('../../controller/consults_controller/consults_controller');

const doctorMidl = require('../../middleware/doctor_middleware');

router.post('/:id' , doctorMidl, consults.makeConsults) ;
router.post('/response/:id' , doctorMidl, consults.addResponse) ;

module.exports = router ;