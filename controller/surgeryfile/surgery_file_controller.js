const knex = require('../../db');
const Joi = require('joi');

module.exports.surgeryRoom = async (req,res)=>{
    const surgeryroomID = req.params.roomid;
    const patientID = req.params.patientid;

    try{
        await knex.transaction(async (trx)=>{
            const patientcheck = await knex('patients').where('id' , patientID)
                .whereNotNull('deleted_at');
        });
    }catch (e){

    }
}