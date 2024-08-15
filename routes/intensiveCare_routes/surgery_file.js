const express = require('express') ;
const router = express.Router() ;

const intensiveCareController = require('../../controller/intensiveCare_controller/surgery_file_controller');


const doctor = require('../../middleware/doctor_middleware') ;
const nurse = require('../../middleware/nurse_middleware') ;

router.post('/:id' , [doctor , nurse], intensiveCareController.surgery_file) ;

module.exports = router;