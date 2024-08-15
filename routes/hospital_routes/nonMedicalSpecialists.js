const express = require('express') ;
const router = express.Router() ;

const specialistController = require('../../controller/hospital_controller/nonMedical_specialist_controller');

router.get('/' , specialistController.getAllNonMedicalSpecialists) ;
router.get('/rooms' , specialistController.getAllRooms) ;
router.get('/rooms/:id' , specialistController.getFloorRoom) ;
router.get('/floors' , specialistController.getAllFloors) ;
router.post('/' , specialistController.createSpecialists) ;

module.exports = router ;