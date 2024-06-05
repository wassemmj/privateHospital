const express = require('express') ;
const router = express.Router() ;

const nonMedicalController = require('../../controller/user_controller/non_medical_controller');

router.post('/:id' , nonMedicalController.createAccount) ; // id of nonMedical specialist
router.get('/' , nonMedicalController.getAllNonMedical) ;
router.get('/details/:id' , nonMedicalController.getNonMedicalDetails) ; // id of nonMedical
router.get('/:id' , nonMedicalController.getNonMedicalSpecialist) ; // id of nonMedical Specialist

router.delete('/:id' , nonMedicalController.deleteAccount) ; // id of nonMedical
router.put('/:id' , nonMedicalController.editAccount) ; // id of nonMedical

module.exports = router ;