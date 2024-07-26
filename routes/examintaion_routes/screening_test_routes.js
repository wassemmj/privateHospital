const express = require('express') ;
const router = express.Router() ;

const screeningController = require('../../controller/examinations_controller/screening_test_controller');

const nurse = require('../../middleware/nurse_middleware') ;
const doctor = require('../../middleware/doctor_middleware') ;

router.post('/patient/:id' , doctor, screeningController.askScreeningTest) ;
router.post('/result/:id' , nurse, screeningController.addScreeningTestResult) ;

router.get('/patient/:id' , screeningController.getPatientScreeningTests) ;
router.get('/' , nurse, screeningController.getTestNotResponse) ;

module.exports = router ;