const express = require('express') ;
const router = express.Router() ;

const ClinicalForm = require('../../controller/clinicl_form_controller/clinical_form_controller');

router.get('/:id/:patientID' , ClinicalForm.getClinicalForms) ;

module.exports = router ;