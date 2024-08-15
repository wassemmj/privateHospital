const express = require('express') ;
const router = express.Router() ;

const doctorController = require('../../controller/user_controller/doctor_controller');

const recepAuth = require('../../middleware/nonMedical_middleware') ;

router.get('/' , doctorController.getAllDoctor) ;
router.get('/:id' , doctorController.getSpecialistDoctor) ; // id of specialist
router.get('/details/:id' , doctorController.getDoctorDetails) ; // id of doctor
router.get('/floor/:id' , doctorController.getFloorsDoctor) ; // id of floor
router.post('/:id' , recepAuth, doctorController.createDoctor) ; // id of specialist

router.delete('/:id' , recepAuth, doctorController.deleteDoctor) ; // id of doctor
router.put('/:id' , recepAuth, doctorController.editDoctor) ; // id of doctor
router.get('/search/:string' , doctorController.searchDoctor) ;

module.exports = router ;