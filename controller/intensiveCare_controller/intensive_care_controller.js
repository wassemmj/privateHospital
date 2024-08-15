const {Patient} = require("../../models/patient_models/Patient");
const {Room} = require('../../models/hospital_models/Room');
const {PatientRoom} = require('../../models/hospital_models/PatientRoom');
const {Companion} = require('../../models/patient_models/Companion');
const knex = require('../../db');
const {validate} = require("node-cron");
const {Doctor} = require("../../models/user_models/Doctor");
const Joi = require('joi').extend(require('@joi/date'));

module.exports.chooseIntensiveCare = async (req, res) => {
    const roomID = req.params.roomid;
    const patientID = req.params.patientid;
    try {
        const patientcheck = await knex('patients').where('id', patientID)
            .whereNull('deleted_at');
        if (patientcheck.length === 0) {
            res.status(200).send({'message': 'the patient is not found'});
            return;
        }
        const roomStatus = await knex('rooms').where('id', roomID).first();
        if (!roomStatus) {
            res.status(200).send({'message': 'the room is not found'});
            return;
        }
        if (roomStatus.status !== 'available') {
            res.status(200).send({'message': 'the room is not available'});
            return;
        }
        await knex('rooms').where({id: roomID}).update({status: 'unavailable'});
        res.status(200).send({'message': 'The IntensiveCare room has been booked  successfully'});
    } catch (error) {
        return res.status(400).send({'message': error.message});
    }
};

module.exports.Intensive_Care_checkout = async (req, res) => {
    const roomID = req.params.roomid;
    try {
        const roomStatus = await knex('rooms').where('id', roomID).first();
        if (roomStatus.status !== 'unavailable') {
            res.status(200).send({'message': 'the room is available already'});
            return;
        }
        await knex('rooms').where('id', roomID).update({status: 'available'});
        res.status(200).send({message: 'The IntensiveCare room is available from now'});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

module.exports.Intensive_Care = async (req, res) => {
    const schema = Joi.object({
        RoomID: Joi.number().required(),
        ptInitial: Joi.string().required(),
        POA: Joi.string().required(),
        code: Joi.string().required(),
        HT: Joi.string().required(),
        WT: Joi.string().required(),
        isolation: Joi.string().required(),
        accucheck: Joi.boolean().required(),
        restraints: Joi.boolean().required(),
        admitDate: Joi.any().required(),
        meds: Joi.string().required(),
        RN: Joi.string().required(),
        Instructor: Joi.string().required()
    });
    const newIntensiveCare = req.body;
    const patientID = req.params.id;

    const {error} = schema.validate(newIntensiveCare);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        newIntensiveCare.patientID = patientID;
        await knex('intensiveCares').insert(newIntensiveCare);
        res.status(200).send({message: 'IntensiveCare has been added successfully'});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

module.exports.Intensive_Care_constants = async (req, res) => {
    const schema = Joi.object({
        currentProblem: Joi.string().required(),
        allergies: Joi.string(),
        activity: Joi.string(),
        neuro: Joi.string(),
        diet: Joi.string(),
        resp: Joi.string(),
        GL: Joi.string(),
        skin: Joi.string(),
        cardiac: Joi.string(),
        pain: Joi.string(),
        M_S: Joi.string(),
        RUE: Joi.string(),
        RLE: Joi.string(),
        LUE: Joi.string(),
        LLE: Joi.string(),
        GU: Joi.string(),
        voidStatus: Joi.string(),
        lastBM: Joi.string(),
        medicalHistory: Joi.string(),
        recentProcedure: Joi.string(),
        IONote: Joi.string(),
        other: Joi.string(),
    });
    const newIntensiveCareConstant = req.body;
    const IntensiveCareID = req.params.IntensiveCareID;

    const {error} = schema.validate(newIntensiveCareConstant);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        newIntensiveCareConstant.IntensiveCareID = IntensiveCareID;
        await knex('constants').insert(newIntensiveCareConstant);
        res.status(200).send({message: 'IntensiveCareConstant has been added successfully'});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};


module.exports.Intensive_Care_changables = async (req, res) => {
    const schema = Joi.object({
        shift: Joi.string(),
        PIV: Joi.number(),
        CVC: Joi.number(),
        PICC: Joi.number(),
        site: Joi.any(),
        fluidRate: Joi.number(),
        other: Joi.string(),
    });
    const newIntensiveCarechangables = req.body;
    const IntensiveCareID = req.params.IntensiveCareID;

    const {error} = schema.validate(newIntensiveCarechangables);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        newIntensiveCarechangables.IntensiveCareID = IntensiveCareID;
        await knex('changables').insert(newIntensiveCarechangables);
        res.status(200).send({message: 'IntensiveCarechangables has been added successfully'});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

module.exports.Intensive_Care_vitals = async (req, res) => {
    const schema = Joi.object({
        HR: Joi.number(),
        BP: Joi.number(),
        Rr: Joi.number(),
        Temp: Joi.number(),
        SPO2: Joi.number(),
        other: Joi.string(),
    });
    const newIntensiveCarevitals = req.body;
    const IntensiveCareID = req.params.IntensiveCareID;

    const {error} = schema.validate(newIntensiveCarevitals);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        newIntensiveCarevitals.IntensiveCareID = IntensiveCareID;
        await knex('vitals').insert(newIntensiveCarevitals);
        res.status(200).send({message: 'IntensiveCarevitals has been added successfully'});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};





