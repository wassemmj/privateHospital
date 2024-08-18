const express = require('express') ;
const router = express.Router() ;

const intensiveCareController = require('../../controller/intensiveCare_controller/surgery_file_controller');


const doctor = require('../../middleware/doctor_middleware') ;
const nurse = require('../../middleware/nurse_middleware') ;

router.post('/:id' , [doctor , nurse], intensiveCareController.surgery_file) ;
router.get('/getAllsurgery/:id' , [doctor , nurse], intensiveCareController.geAll_surgeryFile) ;
router.get('/gett/:id' , [doctor , nurse], intensiveCareController.get_surgeryFile) ;

module.exports = router;