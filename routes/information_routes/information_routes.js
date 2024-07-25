const express = require('express') ;
const router = express.Router() ;

const informationController = require('../../controller/information_controller/information_controller');

const doctor = require('../../middleware/doctor_middleware') ;

router.post('/summaryCharge/:id' , doctor, informationController.summaryCharge) ;
router.get('/summaryCharge/:id' , informationController.getSummaryCharge) ;
router.post('/deathFile/:id' , doctor, informationController.deathFile) ;
router.get('/deathFile/:id' , informationController.getDeathFile) ;

module.exports = router ;