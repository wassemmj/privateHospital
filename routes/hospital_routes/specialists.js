const express = require('express') ;
const router = express.Router() ;

const specialistController = require('../../controller/hospital_controller/specialist_controller');

router.get('/floor' , specialistController.getSpecialistsByFloor) ;
router.get('/' , specialistController.getAllSpecialists) ;
router.get('/:id' , specialistController.getSpecialistsFloor) ; // id of floor
router.post('/' , specialistController.createSpecialists) ;

module.exports = router ;