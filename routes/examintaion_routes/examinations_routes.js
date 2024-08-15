const express = require('express') ;
const router = express.Router() ;
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

const examination = require('../../controller/examinations_controller/medical_examination_controller');

const doctorMidl = require('../../middleware/doctor_middleware');
const nonMedicalAuth = require('../../middleware/doctor_middleware');


module.exports = (io) => {
    router.post('/:id' ,doctorMidl, examination.addMedicalExamination(io)) ;
    router.post('/response/:id' ,nonMedicalAuth, examination.addTheExaminations) ;
    router.get('/' , nonMedicalAuth, examination.getMyExaminationsToResponse) ;
    router.get('/patient/:id' , examination.getPatientExaminations) ;
    router.post('/radiograph/:id' ,doctorMidl, examination.addRadiograph(io)) ;
    router.post('/radiograph/response/:id' , nonMedicalAuth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]) ,  examination.addRadiographResponse) ;
    router.get('/radiograph' , nonMedicalAuth, examination.getMyRadiographToResponse) ;
    router.get('/patient/radio/:id' , examination.getPatientRadiograph) ;
    return router ;
} ;