const express = require('express') ;
const router = express.Router() ;

const workingController = require('../../controller/medical_controller/nurse_scheduling_controller');

router.post('/:id' , workingController.workingTime) ;
router.get('/:id' , workingController.getWorkingTime) ;
router.get('/' , workingController.getAllNurseTime) ;

module.exports = router ;