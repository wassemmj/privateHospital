const express = require('express') ;
const router = express.Router() ;

const other_system_controller = require('../../controller/clinicl_form_controller/other_system_controller');

router.post('/:id' , other_system_controller.otherSystem) ;
router.post('/continuousstory/:id' , other_system_controller.continuousstory) ;
router.put('/editotherSystem/:id' , other_system_controller.editotherSystem) ;
router.put('/editcontinuousstory/:id' , other_system_controller.editcontinuousstory) ;

module.exports = router ;

