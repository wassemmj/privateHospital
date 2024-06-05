const express = require('express') ;
const router = express.Router() ;

const patientController = require('../../controller/patient_controller/patient_auth_controller');

router.post('/', patientController.createPatient);
router.post('/companion/:id', patientController.createCompanion);
router.post('/checkout/:id', patientController.checkout);
router.get('/getpatients', patientController.getpatients);
router.get('/get_checkinPatient', patientController.get_checkinPatient);
router.post('/restorePatient/:id', patientController.restorePatient);
router.post('/chooseRoom/:roomid/:patientid', patientController.chooseRoom);
router.post('/editPatientInformation/:id', patientController.editPatientInformation);
router.post('/editCompanionInformation/:id', patientController.editCompanionInformation);

module.exports = router;