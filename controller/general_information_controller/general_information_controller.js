const {PatientHistory} = require('../../models/general_information/PatientHistory');
const {ComplentDetail} = require('../../models/general_information/ComplentDetail');
const {LMSQA} = require('../../models/general_information/ComplentDetail');
const knex = require('../../db');
const Joi = require('joi');

module.exports.patientHistory = async (req, res) => {
    const schema = Joi.object({
        smoking: Joi.any(),
        alcahol: Joi.any(),
        other: Joi.any(),
    });

    const newHistory = req.body;
    const patientID = req.params.id;
    const {error} = schema.validate(newHistory);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        const patientHistory = new PatientHistory(newHistory);
        patientHistory.patientID = patientID;

        await patientHistory.save();
        res.status(200).send({'message': 'The patient history saved successfully'});
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};

module.exports.complentsDetails = async (req, res) => {
    const schema = Joi.object({
        complentDetail: Joi.object({
            story: Joi.any(),
            startTime: Joi.any(),
            startSituation: Joi.any(),
            catalyst: Joi.any(),
            remedies: Joi.any(),
            complentsFrequency: Joi.any(),
            complentsImprovment: Joi.any(),
        }),
        lmsqa: Joi.object({
            location: Joi.any(),
            severity: Joi.any(),
            movements: Joi.any(),
            quality: Joi.any(),
            association: Joi.any(),
        })
    })

    const newComplent = req.body;
    const patientID = req.params.id;

    const {error} = schema.validate(newComplent);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            if (newComplent.hasOwnProperty('complentDetail')) {
                const complent = newComplent.complentDetail;
                complent.patientID = patientID;

                complentID = await trx('complentsDetails').insert(complent);
                console.log(complentID);
                if (newComplent.hasOwnProperty('lmsqa')) {
                    const lmsqa = newComplent.lmsqa;
                    lmsqa.complentdetailID = complentID;
                    await trx('lmsqas').insert(lmsqa);
                }
                res.status(200).send({'message': "saved successfully"});
            }else{
                throw new Error()
            }
        })
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};


