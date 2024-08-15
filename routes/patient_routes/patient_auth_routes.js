const express = require('express') ;
const router = express.Router() ;

const patientController = require('../../controller/patient_controller/patient_auth_controller');

const recepAuth = require('../../middleware/nonMedical_middleware') ;
const doctor = require('../../middleware/doctor_middleware') ;

router.post('/', recepAuth, patientController.createPatient);
router.post('/companion/:id', recepAuth, patientController.createCompanion);
router.get('/companion/:id', patientController.getCompanion);
router.post('/checkout/:id', recepAuth, patientController.checkout);
router.get('/getpatients', patientController.getpatients);
router.get('/get_checkinPatient', patientController.get_checkinPatient);
router.post('/restorePatient/:id', recepAuth, patientController.restorePatient);
router.post('/chooseRoom/:roomid/:patientid', recepAuth,  patientController.chooseRoom);
router.post('/editPatientInformation/:id', recepAuth, patientController.editPatientInformation);
router.post('/editCompanionInformation/:id', recepAuth, patientController.editCompanionInformation);
router.post('/createClinicalForm/:id', doctor, patientController.createClinicalForm);
router.get('/getAllClinicalForm/:id', patientController.getAllClinicalForm);
router.get('/search/:string', patientController.searchPatientInHospital);
router.get('/searchAll/:string', patientController.searchPatient);
router.get('/getPatientByRoom/:id', patientController.getPatientByRoom);
// router.get('/getPatientNotInRoom', patientController.getPatientNotInRoom);

module.exports = router;