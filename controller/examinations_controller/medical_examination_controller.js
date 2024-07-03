const { NonSpecialists } = require('../../models/hospital_models/NonSpecialist');
const knex = require('../../db');
const Joi = require('joi') ;

module.exports.addMedicalExamination = (io) =>{
    return async (req,res)=>{
        const schema = Joi.object({
            askExaminations : Joi.string()
        })
        const newExamination = req.body;
        const patientID = req.params.id;
        const doctorID = req.doctor.id;

        const {error} = schema.validate(newExamination);
        if (error) return res.status(400).send({'message': error.details[0].message});

        newExamination.doctorID = doctorID;
        newExamination.patientID = patientID;

        try {
            await knex('medicalExaminations').insert(newExamination);
            const laboratory = await knex('nonMedicals').where('nonSpecialistsID' , 1);
            laboratory.forEach(async value => {
                io.to(value.id).emit('Examination',{message: 'New Examinations available'});
                console.log("done " + value.id);
                await knex('examNotifications').insert({message: 'New Examinations available' , nonMedicalID : value.id}) ;
            })

            res.status(200).send({'message': 'success'});
        } catch (e) {
            res.status(404).send({'message': e.message});
        }
    }
}

module.exports.addTheExaminations = async (req, res) => {
    const scheme = Joi.object({
        response: Joi.string().required()
    });
    const ExaminatonID = req.params.id;

    const newResponse = req.body;

    const {error} = scheme.validate(newResponse);
    if (error) return res.status(400).send({'message': error.details[0].message});


    try {
        await knex('medicalExaminations').where('id', ExaminatonID).update(newResponse)
        res.status(200).send({'message': 'success'});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.getMyExaminationsToResponse = async (req, res) => {
    try {
        const Examination = await knex('medicalExaminations').whereNull("response");
        res.status(200).send({'Examinations': Examination});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.addRadiograph = (io) => {
    return async (req,res)=>{
        const schema = Joi.object({
            askRadiographs : Joi.string()
        })
        const newRadiograph = req.body;
        const patientID = req.params.id;
        const doctorID = req.doctor.id;

        const {error} = schema.validate(newRadiograph);
        if (error) return res.status(400).send({'message': error.details[0].message});

        newRadiograph.doctorID = doctorID;
        newRadiograph.patientID = patientID;

        try {
            await knex('radiographs').insert(newRadiograph);
            const laboratory = await knex('nonMedicals').where('nonSpecialistsID' , 2);
            laboratory.forEach(async value => {
                io.to(value.id).emit('Radiograph',{message: 'New Radiograph available'});
                console.log("done " + value.id);
                await knex('radioNotifications').insert({message: 'New Radiograph available' , nonMedicalID : value.id}) ;
            })

            res.status(200).send({'message': 'success'});
        } catch (e) {
            res.status(404).send({'message': e.message});
        }
    }
}

module.exports.addRadiographResponse = async (req, res) => {
    const scheme = Joi.object({
        document: Joi.string(),
        image : Joi.string().valid('image/jpg', 'image/png'),
    });
    const radiographID = req.params.id;

    const newResponse = req.body;
    const {error} = scheme.validate(newResponse);
    if (error) return res.status(400).send({'message': error.details[0].message});

    const { filename } = req.file;
    newResponse.image = filename.path;

    try {
        await knex('radiographs').where('id', radiographID).update(newResponse) ;
        res.status(200).send({'message': 'success'});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.getMyRadiographToResponse = async (req, res) => {
    try {
        const radiographs = await knex('radiographs').whereNull("photo");
        res.status(200).send({'Radiographs': radiographs});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}