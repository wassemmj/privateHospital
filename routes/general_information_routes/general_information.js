const express = require('express') ;
const router = express.Router() ;

const general_information_controller = require('../../controller/general_information_controller/general_information_controller');

router.post('/:id' , general_information_controller.patientHistory) ;
router.post('/complent/:id' , general_information_controller.complentsDetails) ;

module.exports = router ;
