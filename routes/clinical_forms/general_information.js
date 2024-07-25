const express = require('express') ;
const router = express.Router() ;

const general_information_controller = require('../../controller/clinicl_form_controller/general_information_controller');

const doctor = require('../../middleware/doctor_middleware') ;

router.post('/patientHistory/:id' , doctor, general_information_controller.patientHistory) ;
router.post('/complent/:id' , doctor, general_information_controller.complentsDetails) ;
router.get('/getcomplent/:id' , doctor, general_information_controller.getComplentsDetails) ;
router.post('/CompanionsComplents/:id' , doctor , general_information_controller.CompanionsComplents) ;
router.post('/pastHistory/:id' , doctor , general_information_controller.pastHistory) ;
router.put('/editpatientHistory/:id' , doctor , general_information_controller.editpatientHistory) ;
router.put('/editcomplentsDetails/:id' , doctor , general_information_controller.editcomplentsDetails) ;
router.put('/editCompanionsComplents/:id' , doctor , general_information_controller.editCompanionsComplents) ;
router.put('/editpastHistory/:id/:sergonHistoryid' , doctor , general_information_controller.editpastHistory) ;

module.exports = router ;
