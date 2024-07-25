const express = require('express') ;
const router = express.Router() ;

const clinicalExamination = require('../../controller/clinicl_form_controller/clinical_examination_controller');

const doctor = require('../../middleware/doctor_middleware') ;

router.post('/vital/:id' , doctor, clinicalExamination.addVitalSigns) ;
router.put('/vital/:id' , doctor ,  clinicalExamination.editVitalSigns) ;
router.post('/visual/:id' , doctor , clinicalExamination.addVisualExamination) ;
router.put('/visual/:id' , doctor , clinicalExamination.editVisualExamination) ;
router.post('/head/:id' , doctor , clinicalExamination.addHeadExamination) ;
router.put('/head/:id' , doctor , clinicalExamination.editHeadExamination) ;
router.post('/neck/:id' , doctor , clinicalExamination.addNeckExamination) ;
router.put('/neck/:id' , doctor , clinicalExamination.editNeckExamination) ;
router.post('/chest/:id' , doctor , clinicalExamination.addChestExamination) ;
router.put('/chest/:id' , doctor , clinicalExamination.editChestExamination) ;
router.post('/abdomen/:id' , doctor , clinicalExamination.addAbdomenExamination) ;
router.put('/abdomen/:id' , doctor , clinicalExamination.editAbdomenExamination) ;
router.post('/limb/:id' , doctor , clinicalExamination.addLimbsExamination) ;
router.put('/limb/:id' , doctor , clinicalExamination.editLimbsExamination) ;

module.exports = router ;