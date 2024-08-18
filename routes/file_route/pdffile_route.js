const express = require('express') ;
const router = express.Router() ;

const fileController = require('../../controller/patient_controller/file_controller');

const recepAuth = require('../../middleware/nonMedical_middleware') ;
const doctor = require('../../middleware/doctor_middleware') ;

router.get('/:id', fileController.create_pdfFile);

module.exports = router;
