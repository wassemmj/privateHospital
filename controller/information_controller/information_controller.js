const knex = require('../../db');
const Joi = require('joi').extend(require('@joi/date'));

module.exports.summaryCharge = async (req, res) => {
    const schema = Joi.object({
        specialistDoctor: Joi.string().required(),
        inChargeDoctor: Joi.string().required(),
        final: Joi.string().required(),
        entryReason: Joi.string().required(),
        summaryStory: Joi.string().required(),
        tests: Joi.string(),
        procedures: Joi.string(),
        surgeons: Joi.string(),
        treatments: Joi.string(),
        finalSituation: Joi.string().required(),
        guidelines: Joi.string(),
    });
    const newDischargeSummary = req.body;
    const patientID = req.params.id;

    const {error} = schema.validate(newDischargeSummary);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        newDischargeSummary.patientID = patientID;
        await knex('dischargeSummarySheets').insert(newDischargeSummary);
        res.status(200).send({message: 'summary charge has been added successfully'});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

module.exports.getSummaryCharge = async (req, res) => {
    const patientID = req.params.id;
    try {
        const summaryDischarge = await knex('dischargeSummarySheets').where('patientID', patientID);
        res.status(200).send({summaryDischarge: summaryDischarge});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

module.exports.deathFile = async (req, res) => {
    const schema = Joi.object({
        deathFile: Joi.object({
            identityStatus: Joi.string().required(),
            temperature: Joi.string().required(),
            deathLocation: Joi.string().required(),
            deathDate: Joi.date().format('YYYY-MM-DD').utc().required(),
            deathHour: Joi.date().format('HH:MM').utc().required(),
            doctorName: Joi.string().required(),
            fileDate: Joi.date().format('YYYY-MM-DD').utc().required(),
            deathSeen: Joi.string().required(),
        }),
        deathReason: Joi.array().items(Joi.object({
            lastMinute: Joi.string(),
            lastDay: Joi.string(),
            lastYear: Joi.string(),
            reasonLastHour: Joi.string(),
            anatomy: Joi.boolean(),
            autopsy: Joi.boolean(),
        })),
        mannerOfDeath: Joi.object({
            normal: Joi.boolean(),
            notSpecified: Joi.boolean(),
            nonNormal: Joi.boolean(),
        }),
        deathSigns: Joi.object({
            liverMortiseLocation: Joi.string(),
            liverMortiseImprove: Joi.string(),
            liverMortiseColor: Joi.string(),
            liverMortiseRemoved: Joi.boolean(),
            rigorMortiseLocation: Joi.string(),
            dehydration: Joi.string(),
            lateSigns: Joi.string(),
        }),
    });

    const newDeathFile = req.body;
    const patientID = req.params.id;

    const {error} = schema.validate(newDeathFile);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            newDeathFile.deathFile.patientID = patientID;
            const deathFileID = await trx('deathFiles').insert(newDeathFile.deathFile);
            if (newDeathFile.hasOwnProperty('deathReason')) {
                for (let i = 0; i < newDeathFile.deathReason.length; i++) {
                    newDeathFile.deathReason[i].deathFileID = deathFileID;
                    await trx('deathReasons').insert(newDeathFile.deathReason[i]);
                }
            }
            if (newDeathFile.hasOwnProperty('deathSigns')) {
                newDeathFile.deathSigns.deathFileID = deathFileID;
                await trx('deathSigns').insert(newDeathFile.deathSigns);
            }
            if (newDeathFile.hasOwnProperty('mannerOfDeath')) {
                newDeathFile.mannerOfDeath.deathFileID = deathFileID;
                await trx('mannerOfDeaths').insert(newDeathFile.mannerOfDeath);
            }
            res.status(200).send({message: "done successfully"});
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

module.exports.getDeathFile = async (req, res) => {
    const patientID = req.params.id;

    let deathFile = {} ;

    try {
        const death = await knex('deathFiles').where('patientID' , patientID).first() ;
        deathFile.deathFile = death ;
        deathFile.mannerOfDeath = await knex('mannerOfDeaths').where('deathFileID', death.id) ;
        deathFile.deathSigns = await knex('deathSigns').where('deathFileID', death.id) ;
        deathFile.deathReasons = await knex('deathReasons').where('deathFileID', death.id) ;
        res.status(200).send({deathFile: deathFile});
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}