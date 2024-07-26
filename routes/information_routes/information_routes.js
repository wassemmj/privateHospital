const express = require('express') ;
const router = express.Router() ;

const informationController = require('../../controller/information_controller/information_controller');

const doctor = require('../../middleware/doctor_middleware') ;
const nurse = require('../../middleware/nurse_middleware') ;

router.post('/summaryCharge/:id' , [doctor , nurse], informationController.summaryCharge) ;
router.get('/summaryCharge/:id' , informationController.getSummaryCharge) ;
router.post('/deathFile/:id' , doctor, informationController.deathFile) ;
router.get('/deathFile/:id' , informationController.getDeathFile) ;

module.exports = router ;