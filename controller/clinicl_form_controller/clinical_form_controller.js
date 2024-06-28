const knex = require('../../db');
const Joi = require('joi');

module.exports.getClinicalForms = async (req , res) => {
    const clinicalForms = {} ;
    const id = req.params.id ;
    const patientID = req.params.patientID ;
    try {
        const patient = await knex('patients').select().where('id' , patientID).first() ;
        clinicalForms.demographInfo = patient ;
        const vitalSigns = await knex('vitalSigns').where('clinicalFormID' , id).first() ;
        clinicalForms.vitalSigns = vitalSigns ;
        res.status(200).send({'clinical form' : clinicalForms}) ;
    } catch (e) {
        res.status(404).send({'message' : e.message}) ;
    }
}