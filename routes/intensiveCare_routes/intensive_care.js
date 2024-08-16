const express = require('express') ;
const router = express.Router() ;

const intensiveCareController = require('../../controller/intensiveCare_controller/intensive_care_controller');

const doctor = require('../../middleware/doctor_middleware') ;
const nurse = require('../../middleware/nurse_middleware') ;
router.post('/Intensive_Care/:id' , [doctor , nurse], intensiveCareController.Intensive_Care) ;
router.post('/IntensiveCarecheckout/:roomid' , [doctor , nurse], intensiveCareController.Intensive_Care_checkout) ;
router.post('/Intensive_Care_constants/:IntensiveCareID' , [doctor , nurse], intensiveCareController.Intensive_Care_constants) ;
router.post('/Intensive_Care_changables/:IntensiveCareID' , [doctor , nurse], intensiveCareController.Intensive_Care_changables) ;
router.post('/Intensive_Care_vitals/:IntensiveCareID' , [doctor , nurse], intensiveCareController.Intensive_Care_vitals) ;
router.post('/:patientid/:roomid' , [doctor , nurse], intensiveCareController.chooseIntensiveCare) ;
router.get('/:id' , [doctor , nurse], intensiveCareController.get_Intensive_care) ;
router.get('/constant/:id' , [doctor , nurse], intensiveCareController.get_Intensive_care_constant) ;
router.get('/changable/:id' , [doctor , nurse], intensiveCareController.get_Intensive_care_changable) ;
router.get('/vitals/:id' , [doctor , nurse], intensiveCareController.get_Intensive_care_vitals) ;

module.exports = router;