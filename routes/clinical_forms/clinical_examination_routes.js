const express = require('express') ;
const router = express.Router() ;

const clinicalExamination = require('../../controller/clinicl_form_controller/clinical_examination_controller');

router.post('/vital/:id' , clinicalExamination.addVitalSigns) ;
router.put('/vital/:id' , clinicalExamination.editVitalSigns) ;
router.post('/visual/:id' , clinicalExamination.addVisualExamination) ;
router.put('/visual/:id' , clinicalExamination.editVisualExamination) ;
router.post('/head/:id' , clinicalExamination.addHeadExamination) ;
router.put('/head/:id' , clinicalExamination.editHeadExamination) ;
router.post('/neck/:id' , clinicalExamination.addNeckExamination) ;
router.put('/neck/:id' , clinicalExamination.editNeckExamination) ;
router.post('/chest/:id' , clinicalExamination.addChestExamination) ;
router.put('/chest/:id' , clinicalExamination.editChestExamination) ;
router.post('/abdomen/:id' , clinicalExamination.addAbdomenExamination) ;
router.put('/abdomen/:id' , clinicalExamination.editAbdomenExamination) ;
router.post('/limb/:id' , clinicalExamination.addLimbsExamination) ;
router.put('/limb/:id' , clinicalExamination.editLimbsExamination) ;

module.exports = router ;