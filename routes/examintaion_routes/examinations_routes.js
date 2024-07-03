const express = require('express') ;
const router = express.Router() ;
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'public/images/',
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        cb(null, `${originalName.replace(extension, '')}-${Date.now()}${extension}`);
    }
});

const upload = multer({ storage });

const examination = require('../../controller/examinations_controller/medical_examination_controller');

const doctorMidl = require('../../middleware/doctor_middleware');


module.exports = (io) => {
    router.post('/:id' ,doctorMidl, examination.addMedicalExamination(io)) ;
    router.post('/response/:id' , examination.addTheExaminations) ;
    router.get('/' , examination.getMyExaminationsToResponse) ;
    router.post('/radiograph/:id' ,doctorMidl, examination.addRadiograph(io)) ;
    router.post('/radiograph/response/:id' , upload.single('photo') ,  examination.addRadiographResponse) ;
    router.get('/radiograph/' , examination.getMyExaminationsToResponse) ;
    return router ;
} ;