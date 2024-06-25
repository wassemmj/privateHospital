const express = require('express') ;
const router = express.Router() ;

const clinicalExamination = require('../../controller/clinical_examination/clinical_examination_controller');

router.post('/vital/:id' , clinicalExamination.addVitalSigns) ;
router.put('/vital/:id' , clinicalExamination.editVitalSigns) ;
router.post('/visual/:id' , clinicalExamination.addVisualExamination) ;
router.post('/head/:id' , clinicalExamination.addHeadExamination) ;
router.post('/neck/:id' , clinicalExamination.addNeckExamination) ;
router.post('/chest/:id' , clinicalExamination.addChestExamination) ;
router.post('/abdomen/:id' , clinicalExamination.addAbdomenExamination) ;
router.post('/limb/:id' , clinicalExamination.addLimbsExamination) ;

module.exports = router ;