const express = require('express') ;
const router = express.Router() ;

const general_information_controller = require('../../controller/clinicl_form_controller/general_information_controller');

router.post('/patientHistory/:id' , general_information_controller.patientHistory) ;
router.post('/complent/:id' , general_information_controller.complentsDetails) ;
router.get('/getcomplent/:id' , general_information_controller.getComplentsDetails) ;
router.post('/CompanionsComplents/:id' , general_information_controller.CompanionsComplents) ;
router.post('/pastHistory/:id' , general_information_controller.pastHistory) ;
router.put('/editpatientHistory/:id' , general_information_controller.editpatientHistory) ;
router.put('/editcomplentsDetails/:id' , general_information_controller.editcomplentsDetails) ;
router.put('/editCompanionsComplents/:id' , general_information_controller.editCompanionsComplents) ;
router.put('/editpastHistory/:id/:sergonHistoryid' , general_information_controller.editpastHistory) ;

module.exports = router ;
