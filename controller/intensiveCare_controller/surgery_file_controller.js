const {Patient} = require("../../models/patient_models/Patient");
const {Room} = require('../../models/hospital_models/Room');
const {PatientRoom} = require('../../models/hospital_models/PatientRoom');
const {Companion} = require('../../models/patient_models/Companion');
const knex = require('../../db');
const {validate} = require("node-cron");
const {Doctor} = require("../../models/user_models/Doctor");
const Joi = require('joi').extend(require('@joi/date'));


module.exports.surgery_file = async (req, res) => {
    const schema = Joi.object({
        otherInfos: Joi.object({
            injuryType: Joi.any(),
            ASA: Joi.any(),
            surgerySituation: Joi.any(),
            surgeryDuration: Joi.any(),
            antipathetic: Joi.any(),
            antipatheticStartDate: Joi.any(),
            antipatheticStopDate: Joi.any()
        }),
        medicalCrewInfos: Joi.object({
            surgeonName: Joi.any(),
            helperSurgeonName: Joi.any(),
            nurseName: Joi.any(),
            surgeonRoomNumber: Joi.any(),
            surgeryName: Joi.any(),
            helperNurse: Joi.any()
        })
    });

    const newsurgeryFile = req.body;
    const patientID = req.params.id;

    const {error} = schema.validate(newsurgeryFile);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            surgeryFile = await trx('surgeryFiles').insert({'patientID': patientID});

            if (newsurgeryFile.hasOwnProperty('otherInfos')){
                const otherInfos = newsurgeryFile.otherInfos;
                otherInfos.surgeryFileID = surgeryFile;
                await trx('otherInfos').insert(otherInfos);
            }

            if (newsurgeryFile.hasOwnProperty('medicalCrewInfos')){
                const medicalCrewInfos = newsurgeryFile.medicalCrewInfos;
                medicalCrewInfos.surgeryFileID = surgeryFile;
                await trx('medicalCrewInfos').insert(medicalCrewInfos);
            }
                res.status(200).send({'message': "saved successfully"});
            }
        );
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};

module.exports.geAll_surgeryFile = async (req,res)=>{
    try{
        patientID = req.params.id;
        const patientSurgery = await knex('surgeryFiles').select('id' , 'created_at').where('patientID' , patientID).orderBy('id', 'desc');
        res.status(200).send({'patientSurgery' : patientSurgery})

    }catch (e){
        res.status(404).send({'message': e.message});
    }

}

module.exports.get_surgeryFile =async (req,res) =>{
    const patientSurgeryyyy = {} ;
    try{
        const surgeryID = req.params.id;
        // const patientSurgery = await knex('surgeryFiles').where('patientID' , patientID).orderBy('id', 'desc').first();
        const patientotherInfos = await knex('otherInfos').where('surgeryFileID' , surgeryID );
        const patientmedicalCrewInfos = await knex('medicalCrewInfos').where('surgeryFileID' , surgeryID );
        // console.log(patientCarevitals);
        patientSurgeryyyy.patientotherInfos = patientotherInfos;
        patientSurgeryyyy.patientmedicalCrewInfos = patientmedicalCrewInfos;

        res.status(200).send({'patientSurgeryyyy' : patientSurgeryyyy})
    }catch (e){
        res.status(404).send({'message': e.message});
    }
}


