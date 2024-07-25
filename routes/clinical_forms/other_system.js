const express = require('express') ;
const router = express.Router() ;

const other_system_controller = require('../../controller/clinicl_form_controller/other_system_controller');

const doctor = require('../../middleware/doctor_middleware') ;

router.post('/:id' , doctor, other_system_controller.otherSystem) ;
router.post('/continuousstory/:id' , doctor, other_system_controller.continuousstory) ;
router.put('/editotherSystem/:id' , doctor, other_system_controller.editotherSystem) ;
router.put('/editcontinuousstory/:id' , doctor, other_system_controller.editcontinuousstory) ;

module.exports = router ;

