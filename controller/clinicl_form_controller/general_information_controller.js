const {PatientHistory} = require('../../models/general_information/PatientHistory');
const {CompanionComplent} = require('../../models/general_information/CompanionComplent');
const knex = require('../../db');
const Joi = require('joi');

module.exports.patientHistory = async (req, res) => {
    const schema = Joi.object({
        smoking: Joi.any(),
        alcahol: Joi.any(),
        other: Joi.any(),
    });

    const newHistory = req.body;
    const clinicalformID = await knex('clinicalForms').where('patientID', req.params.id);

    const {error} = schema.validate(newHistory);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        const patientHistory = new PatientHistory(newHistory);
        patientHistory.clinicalFormID = clinicalformID[clinicalformID.length - 1].id;

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
    const clinicalform = await knex('clinicalForms').where('patientID', req.params.id);

    const {error} = schema.validate(newComplent);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            if (newComplent.hasOwnProperty('complentDetail')) {
                const complent = newComplent.complentDetail;
                complent.clinicalformID = clinicalform[clinicalform.length - 1].id;

                const complentID = await trx('complentsDetails').insert(complent);
                if (newComplent.hasOwnProperty('lmsqa')) {
                    const lmsqa = newComplent.lmsqa;
                    lmsqa.complentdetailID = complentID;
                    await trx('lmsqas').insert(lmsqa);
                }
                res.status(200).send({'message': "saved successfully"});
            } else {
                throw new Error("there is no complent details")
            }
        })
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};

module.exports.getComplentsDetails = async (req, res) => {
    try {
        const ComplentsDetails = await knex('complentsdetails').where({'clinicalFormID': req.params.id});
        res.status(200).send({'ComplentsDetails': ComplentsDetails});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
};

module.exports.CompanionsComplents = async (req, res) => {
    const schema = Joi.object({
        timeSituation: Joi.any(),
        catalystRemedies: Joi.any(),
        frequencyImprovment: Joi.any(),
        other: Joi.any(),
    });
    const newCompanionsComplents = req.body;
    const ComplentsDetailsID = req.params.id;

    const {error} = schema.validate(newCompanionsComplents);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        const companion = new CompanionComplent(newCompanionsComplents);
        companion.complentdetailID = ComplentsDetailsID;

        await companion.save();
        res.status(200).send({'message': 'The Companion Complent saved successfully'});
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};

module.exports.pastHistory = async (req, res) => {
    const schema = Joi.object({
        Internal_Disease: Joi.object({
            HTN: Joi.any(),
            DM: Joi.any(),
            IHD: Joi.any(),
            CKD: Joi.any(),
            other: Joi.any(),
            startTime: Joi.any(),
            drugAllergy: Joi.any(),
        }),
        sergonHistory: Joi.object({
            sergon: Joi.any(),
            history: Joi.any(),
            tumbers: Joi.any()
        })
    });

    const newpastMidecal = req.body;
    const clinicalform = await knex('clinicalForms').where('patientID', req.params.id);

    const {error} = schema.validate(newpastMidecal);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {

            const clinicalformID = clinicalform[clinicalform.length - 1].id;
            pastHistoryID = await trx('pastMedicalHistorys').insert({'clinicalFormID': clinicalformID});

            if (newpastMidecal.hasOwnProperty('Internal_Disease')) {
                const InternalDisease = newpastMidecal.Internal_Disease;
                InternalDisease.pastmedicalID = pastHistoryID;
                await trx('internal_diseases_and_genetic_disorders').insert(InternalDisease);
            }

            if (newpastMidecal.hasOwnProperty('sergonHistory')) {
                const SergonHistory = newpastMidecal.sergonHistory;
                SergonHistory.pastmedicalID = pastHistoryID;
                await trx('sergonsHistorys').insert(SergonHistory);
            }

            res.status(200).send({'message': "saved successfully"});
        })

    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};

module.exports.editpatientHistory = async (req, res) => {
    const schema = Joi.object({
        smoking: Joi.any(),
        alcahol: Joi.any(),
        other: Joi.any(),
    });

    const newHistory = req.body;
    const {error} = schema.validate(newHistory);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            const id = req.params.id;
            if (isNaN(id) || id <= 0) {
                throw new Error('bad request!');
            }
            await trx('patientshistorys').where('id', id).update(newHistory);
            res.status(200).send({'message': "updated successfully"});
        })
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};

module.exports.editcomplentsDetails = async (req, res) => {
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

    const {error} = schema.validate(newComplent);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            const id = req.params.id;
            if (isNaN(id) || id <= 0) {
                throw new Error('bad request!');
            }
            if (newComplent.hasOwnProperty('complentDetail')) {
                const complent = newComplent.complentDetail;

                await trx('complentsDetails').where('id' , id).update(complent);
            }
            if (newComplent.hasOwnProperty('lmsqa')) {
                const lmsqa = newComplent.lmsqa;
                await trx('lmsqas').where('complentdetailID', id).update(lmsqa);
            }
            res.status(200).send({'message': "updated successfully"});
        })
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};

module.exports.editCompanionsComplents = async (req, res) => {
    const schema = Joi.object({
        timeSituation: Joi.any(),
        catalystRemedies: Joi.any(),
        frequencyImprovment: Joi.any(),
        other: Joi.any(),
    });
    const newCompanionsComplents = req.body;

    const {error} = schema.validate(newCompanionsComplents);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            const id = req.params.id;
            if (isNaN(id) || id <= 0) {
                throw new Error('bad request!');
            }
            await trx('companionscomplents').where('id', id).update(newCompanionsComplents);
            res.status(200).send({'message': "updated successfully"});
        })
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};

module.exports.editpastHistory = async (req, res) => {
    const schema = Joi.object({
        Internal_Disease: Joi.object({
            HTN: Joi.any(),
            DM: Joi.any(),
            IHD: Joi.any(),
            CKD: Joi.any(),
            other: Joi.any(),
            startTime: Joi.any(),
            drugAllergy: Joi.any(),
        }),
        sergonHistory: Joi.object({
            sergon: Joi.any(),
            history: Joi.any(),
            tumbers: Joi.any()
        })
    });

    const newpastMidecal = req.body;

    const {error} = schema.validate(newpastMidecal);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            const id = req.params.id;
            const sergonHistoryid = req.params.sergonHistoryid
            if (isNaN(id) || id <= 0) {
                throw new Error('bad request!');
            }

            if (newpastMidecal.hasOwnProperty('Internal_Disease')) {
                const InternalDisease = newpastMidecal.Internal_Disease;
                await trx('internal_diseases_and_genetic_disorders').where('pastmedicalID' , id).update(InternalDisease);
            }

            if (newpastMidecal.hasOwnProperty('sergonHistory') && sergonHistoryid>0) {
                const SergonHistory = newpastMidecal.sergonHistory;
                await trx('sergonsHistorys').where('pastmedicalID' , id).andWhere('id' , sergonHistoryid).update(SergonHistory);
            }

            res.status(200).send({'message': "uptaded successfully"});
        })

    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
};