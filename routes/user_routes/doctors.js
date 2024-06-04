const express = require('express') ;
const router = express.Router() ;

const doctorController = require('../../controller/user_controller/doctor_controller');

router.get('/' , doctorController.getAllDoctor) ;
router.get('/:id' , doctorController.getSpecialistDoctor) ; // id of specialist
router.get('/details/:id' , doctorController.getDoctorDetails) ; // id of doctor
router.get('/floor/:id' , doctorController.getFloorsDoctor) ; // id of floor
router.post('/:id' , doctorController.createDoctor) ; // id of specialist

module.exports = router ;