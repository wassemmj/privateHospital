const express = require('express') ;
const router = express.Router() ;

const notificationController = require('../../controller/notification_controller/notification_controller');

const doctorAuth = require('../../middleware/doctor_middleware') ;
const nonMedicalAuth = require('../../middleware/nonMedical_middleware') ;

router.get('/not' , doctorAuth, notificationController.getNotification) ;
router.get('/exam' , nonMedicalAuth, notificationController.getExamNotification) ;
router.get('/radio' , nonMedicalAuth, notificationController.getRadioNotification) ;

router.post('/not/:id' , doctorAuth, notificationController.makeNotificationRead) ;
router.post('/exam/:id' , nonMedicalAuth, notificationController.makeExamNotificationRead) ;
router.post('/radio/:id' , nonMedicalAuth, notificationController.makeRadioNotificationRead) ;

module.exports = router ;