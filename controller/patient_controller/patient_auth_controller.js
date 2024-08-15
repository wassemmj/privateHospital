const {Patient} = require("../../models/patient_models/Patient");
const {Room} = require('../../models/hospital_models/Room');
const {PatientRoom} = require('../../models/hospital_models/PatientRoom');
const {Companion} = require('../../models/patient_models/Companion');
const knex = require('../../db');
const {validate} = require("node-cron");
const {Doctor} = require("../../models/user_models/Doctor");
const Joi = require('joi').extend(require('@joi/date'));

module.exports.createPatient = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).required(),
        motherName: Joi.string().min(2).required(),
        fatherName: Joi.string().min(2).required(),
        phoneNumber: Joi.string().min(10).required(),
        internationalNumber: Joi.string().required(),
        currentLocation: Joi.string().required(),
        birthdate: Joi.date().format('YYYY-MM-DD').utc().required(),
        gender: Joi.boolean().required(),
        work: Joi.string().required(),
        socialStatus: Joi.string().required(),
        // roomID: Joi.number().allow(null)
    });
    // const roomID = req.body.roomID;
    const newPatient = req.body;

    const {error} = schema.validate(newPatient);
    if (error) return res.status(404).send({'message': error.details[0].message});

    // newPatient.roomID = roomID ? roomID :null;
    const patient = new Patient(newPatient);
    try {
        // await knex.transaction(async (trx) => {
        // if (roomID){
        //     const roomStatus = await knex('rooms').where('id' , roomID).first();
        //
        //     if (!roomStatus) {
        //         throw new Error('Room not found');
        //     }
        //
        //     if(roomStatus.status !== 'available'){
        //         throw new Error('Room is not available');
        //     }
        //     await trx('rooms').where({id : roomID}).update({status : 'unavailable'});

        // }
        // const [patientId] = await trx('patients')
        //     .insert(patient)
        //     .returning('id');
        const id = await patient.save();
        res.status(200).send({'message': 'The patient profile created successfully' , 'id' : id});

    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};

module.exports.chooseRoom = async (req, res) => {
    const roomID = req.params.roomid;
    const patientID = req.params.patientid;
    try {
        await knex.transaction(async (trx) => {
            const patientcheck = await knex('patients').where('id' , patientID)
                .whereNull('deleted_at');
            if (patientcheck.length === 0){
                throw new Error('the patient is not in the system');
            }
            const roomStatus = await knex('rooms').where('id', roomID).first();
            const patientStatus = await knex('patientRoom').select('roomID', 'patientID')
                .where('patientID', patientID);
            if (!roomStatus) {
                throw new Error('Room not found');
            }

            if (roomStatus.status !== 'available') {
                throw new Error('Room is not available');
            }
            if (patientStatus.length !== 0) {
                await knex('patientRoom').where('patientID', patientID).first().delete();
                await knex('rooms').where({id: patientStatus[0].roomID}).update({status: 'available'});
            }
            await trx('rooms').where({id: roomID}).update({status: 'unavailable'});

            const patientRoom = new PatientRoom({roomID: roomID, patientID: patientID});
            await trx('patientRoom').insert(patientRoom);
            res.status(200).send({'message': 'The room has been booked  successfully'});
        });
    } catch (error) {
        return res.status(400).send({'message': error.message});
    }
};

module.exports.editPatientInformation = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3),
        motherName: Joi.string().min(2),
        fatherName: Joi.string().min(2),
        phoneNumber: Joi.string().min(10),
        internationalNumber: Joi.string(),
        currentLocation: Joi.string(),
        birthdate: Joi.date().format('YYYY-MM-DD').utc(),
        gender: Joi.boolean(),
        work: Joi.string(),
        socialStatus: Joi.string(),
    });

    const updatePatient = req.body ;

    const { error } = schema.validate(updatePatient) ;
    if (error) return res.status(400).send({'message' : error.details[0].message}) ;

    try{
        const id = req.params.id ;
        const patientcheck = await knex('patients').where('id' , id)
            .whereNotNull('deleted_at');
        if (patientcheck){
            throw new Error('the patient is not in the system');
        }
        if (isNaN(id) || id <=0) {
            throw new Error('bad request!') ;
        }
        const result = await knex('patients').where('id' , id).update(updatePatient);
        if (result === 0){
            res.status(400).send({'message' : 'The Patient not found '}) ;
            return ;
        }
        res.status(200).send({'message' : 'The Patient updated successfully'}) ;
    }catch(e){
        return res.status(400).send({'message' : e.message}) ;
    }
};

module.exports.editCompanionInformation = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3),
        phoneNumber: Joi.string().min(10),
        internationalNumber: Joi.string()
    });

    const updateCompanion = req.body ;

    const { error } = schema.validate(updateCompanion) ;
    if (error) return res.status(400).send({'message' : error.details[0].message}) ;

    try{
        const id = req.params.id ;
        if (isNaN(id) || id <=0) {
            throw new Error('bad request!') ;
        }
        const result = await knex('companions').where('id' , id).update(updateCompanion);
        if (result === 0){
            res.status(400).send({'message' : 'The Companion not found '}) ;
            return ;
        }
        res.status(200).send({'message' : 'The Companion updated successfully'}) ;
    }catch(e){
        return res.status(400).send({'message' : e.message}) ;
    }
};

module.exports.createCompanion = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).required(),
        phoneNumber: Joi.string().min(10).required(),
        internationalNumber: Joi.string().required(),
    });
    const patientID = req.params.id;

    const newCompanion = req.body;
    const {error} = schema.validate(newCompanion);
    if (error) return res.status(404).send({'message': error.details[0].message});

    newCompanion.patientID = patientID;
    const companion = new Companion(newCompanion);

    try {
        await companion.save();
        res.status(200).send({'message': 'The companion added sucessfully'});
    } catch (e) {
        if ('ER_NO_REFERENCED_ROW_2' === e.code) {
            return res.status(400).send({'message': 'the patient id is wrong'});
        }
        return res.status(400).send({'message': e});
    }
};

module.exports.checkout = async (req, res) => {
    const patientID = req.params.id;
    try {
        await knex.transaction(async (trx) => {
            const result = await trx('patients').where('id', patientID)
                .whereNull('deleted_at')
                .update('deleted_at', knex.fn.now());
            if (result === 0) {
                return res.status(404).send({message: 'Patient not found or already checked out'});
            }
            const pateintroom = await trx('patientRoom').where('patientID', patientID)
                .first();
            await trx('patientRoom').where('patientID', patientID)
                .delete();
            await trx('rooms').where('id', pateintroom.roomID).update({status: 'available'});
            res.status(200).send({message: 'Patient checked out successfully'});
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

module.exports.getpatients = async (req, res) => {
    try {
        const patients = await knex('patients');
        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'An error occurred while fetching patient records'});
    }
};

module.exports.get_checkinPatient = async (req, res) => {
    try {
        const patients = await knex('patients')
            .whereNull('deleted_at');

        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'An error occurred while fetching patient records'});
    }
};

module.exports.restorePatient = async (req, res) => {
    const patientID = req.params.id;
    try {
        const patient = await knex('patients').where('id', patientID)
            .whereNotNull('deleted_at')
            .update('deleted_at', null);
        if (patient === 0) {
            return res.status(404).send({message: 'Patient not found or not checked out'});
        }
        res.status(200).send({'message': 'the patient check in successfully'})
    } catch (error) {
        res.status(500).send({message: 'An error occurred while restoring the patient'});
    }
};

module.exports.createClinicalForm = async (req,res)=>{
    try{
        const formID = await  knex('clinicalForms').insert({'patientID': req.params.id})
        res.status(200).send({'formID':formID});
    }catch (e){
        res.status(404).send({'message':e.message});
    }
};

module.exports.getAllClinicalForm = async (req,res)=>{
    try{
        const ClinicalForm = await  knex('clinicalForms').where({'patientID': req.params.id});
        res.status(200).send({'ClinicalForm':ClinicalForm});
    }catch (e){
        res.status(404).send({'message':e.message});
    }
};

module.exports.getCompanion = async (req , res) => {
    try {
        const patients = await knex('companions').where('patientID' , req.params.id).first();
        res.status(200).send({companion: patients});
    } catch (error) {
        res.status(500).send({message: 'An error occurred while fetching patient records'});
    }
}

module.exports.searchPatientInHospital = async (req , res) => {
    try {
        const patients = await knex('patients')
            .where('fullName' , 'like' , `%${req.params.string}%`)
            .whereNull('deleted_at');
        res.status(200).send({patients: patients});
    } catch (error) {
        res.status(500).send({message: 'An error occurred while fetching patient records'});
    }
}

module.exports.searchPatient = async (req , res) => {
    try {
        const patients = await knex('patients')
            .where('fullName' , 'like' , `%${req.params.string}%`);
        res.status(200).send({patients: patients});
    } catch (error) {
        res.status(500).send({message: 'An error occurred while fetching patient records'});
    }
}

module.exports.getPatientByRoom = async (req , res) => {
    try {
        const patients = await knex('patients as p')
            .join ('patientRoom as pr' , 'p.id' , 'pr.patientID')
            .where('pr.roomID' , '=' , req.params.id);
        patients.forEach((value) => {
            value.birthdate = new Intl.DateTimeFormat('fr-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date (value.birthdate)) ;
        }) ;
        res.status(200).send({patient: patients[0]});
    } catch (error) {
        res.status(500).send({message: 'An error occurred while fetching patient records'});
    }
}