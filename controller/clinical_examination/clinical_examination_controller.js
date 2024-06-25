const {VitalSign} = require('../../models/clinical_examination/VitalSign');
const {VisualExamination} = require('../../models/clinical_examination/VisualExamination');
const {NeckExamination} = require('../../models/clinical_examination/NeckExamination');
const knex = require('../../db');
const Joi = require('joi');

module.exports.addVitalSigns = async (req, res) => {
    const scheme = Joi.object({
        Bp: Joi.any(),
        Rr: Joi.any(),
        bodyTempreture: Joi.any(),
        heartRate: Joi.any(),
    });

    const newVital = req.body;
    const patientID = req.params.id;

    const {error} = scheme.validate(newVital);
    if (error) return res.status(400).send({'message': error.details[0].message});

    const clinicalInfo = await knex('clinicalForms').where('patientID', patientID);

    try {
        const vital = new VitalSign(newVital);
        vital.clinicalFormID = clinicalInfo[clinicalInfo.length - 1].id;
        await vital.save();
        res.status(200).send({'message': 'success'});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.editVitalSigns = async (req, res) => {
    const scheme = Joi.object({
        Bp: Joi.any(),
        Rr: Joi.any(),
        bodyTempreture: Joi.any(),
        heartRate: Joi.any(),
    });

    const oldVital = req.body;
    const oldVitalID = req.params.id;

    const {error} = scheme.validate(oldVital);
    if (error) return res.status(400).send({'message': error.details[0].message});
    try {
        const vital = new VitalSign(oldVital);
        const have = await knex('vitalSigns').where('id', oldVitalID).first();
        vital.clinicalFormID = have.clinicalFormID;
        if (have) {
            await vital.update(oldVitalID);
        }
        res.status(200).send({'message': 'success'});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.addVisualExamination = async (req, res) => {
    const scheme = Joi.object({
        goodCondition: Joi.any(),
        cachecticPatient: Joi.any(),
        conscience: Joi.string().valid('Alert_and_Responsive', 'Mental_Confusion', 'Unconscious', null),
        gcs: Joi.any(),
    });

    const newVisual = req.body;
    const patientID = req.params.id;

    const {error} = scheme.validate(newVisual);
    if (error) return res.status(400).send({'message': error.details[0].message});

    const clinicalInfo = await knex('clinicalForms').where('patientID', patientID);

    try {
        const visual = new VisualExamination(newVisual);
        visual.clinicalFormID = clinicalInfo[clinicalInfo.length - 1].id;
        await visual.save();
        res.status(200).send({'message': 'success'});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.editVisualExamination = async (req, res) => {
    const scheme = Joi.object({
        goodCondition: Joi.any(),
        cachecticPatient: Joi.any(),
        conscience: Joi.string().valid('Alert_and_Responsive', 'Mental_Confusion', 'Unconscious', null),
        gcs: Joi.any(),
    });

    const oldVisual = req.body;
    const visualID = req.params.id;

    const {error} = scheme.validate(oldVisual);
    if (error) return res.status(400).send({'message': error.details[0].message});
    try {
        const visual = new VisualExamination(oldVisual);
        const have = await knex('visualExaminations').where('id', visualID).first();
        visual.clinicalFormID = have.clinicalFormID;
        if (have) {
            await knex('visualExaminations').where('id', visualID).update(visual);
        }
        res.status(200).send({'message': 'success'});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.addHeadExamination = async (req, res) => {
    const scheme = Joi.object({
        skin: Joi.object({
            color: Joi.any(),
            natural: Joi.any(),
            other: Joi.any(),
            hair: Joi.any(),
        }),
        eyes: Joi.object({
            pallor: Joi.any(),
            jaundice: Joi.any(),
            Nystagmus: Joi.any(),
            Enophthalmos: Joi.any(),
            Exophthalmos: Joi.any(),
        }),
        mouth: Joi.object({
            atrophicGlossitis: Joi.any(),
            macroglossia: Joi.any(),
            color: Joi.any(),
            toothDecay: Joi.any(),
            Macrogingivae: Joi.any(),
            gingivalBleeding: Joi.any(),
            Ulcers: Joi.any(),
        }),
    });

    const newHead = req.body;
    const patientID = req.params.id;

    const {error} = scheme.validate(newHead);
    if (error) return res.status(400).send({'message': error.details[0].message});

    const clinicalInfo = await knex('clinicalForms').where('patientID', patientID);

    try {
        await knex.transaction(async (trx) => {

            let headsExaminationsID = await trx('headsExaminations').insert({'clinicalFormID': clinicalInfo[clinicalInfo.length - 1].id});

            if (newHead.hasOwnProperty('skin')) {
                const skin = newHead.skin;
                skin.headsExaminationsID = headsExaminationsID;
                await trx('skins').insert(skin);
            }
            if (newHead.hasOwnProperty('eyes')) {
                const eyes = newHead.eyes;
                eyes.headsExaminationsID = headsExaminationsID;
                await trx('eyes').insert(eyes);
            }
            if (newHead.hasOwnProperty('mouth')) {
                const mouth = newHead.mouth;
                mouth.headsExaminationsID = headsExaminationsID;
                await trx('mouths').insert(mouth);
            }
        });
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.editHeadExamination = async (req, res) => {
    const scheme = Joi.object({
        skin: Joi.object({
            color: Joi.any(),
            natural: Joi.any(),
            other: Joi.any(),
            hair: Joi.any(),
        }),
        eyes: Joi.object({
            pallor: Joi.any(),
            jaundice: Joi.any(),
            Nystagmus: Joi.any(),
            Enophthalmos: Joi.any(),
            Exophthalmos: Joi.any(),
        }),
        mouth: Joi.object({
            atrophicGlossitis: Joi.any(),
            macroglossia: Joi.any(),
            color: Joi.any(),
            toothDecay: Joi.any(),
            Macrogingivae: Joi.any(),
            gingivalBleeding: Joi.any(),
            Ulcers: Joi.any(),
        }),
    });

    const oldHead = req.body;
    const headID = req.params.id;

    const {error} = scheme.validate(oldHead);
    if (error) return res.status(400).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            const heads = await knex('headsExaminations').where('id', headID);
            let headsExaminationsID = 0;
            if (heads.length > 0) {
                headsExaminationsID = heads[0].id;
            }
            if (oldHead.hasOwnProperty('skin')) {
                const skin = oldHead.skin;
                skin.headsExaminationsID = headsExaminationsID;
                if (heads.length > 0) {
                    await trx('skins').where('headsExaminationsID', headsExaminationsID).update(skin);
                }
            }
            if (oldHead.hasOwnProperty('eyes')) {
                const eyes = oldHead.eyes;
                eyes.headsExaminationsID = headsExaminationsID;
                if (heads.length > 0) {
                    await trx('eyes').where('headsExaminationsID', headsExaminationsID).update(eyes);
                }
            }
            if (oldHead.hasOwnProperty('mouth')) {
                const mouth = oldHead.mouth;
                mouth.headsExaminationsID = headsExaminationsID;
                if (heads.length > 0) {
                    await trx('mouths').where('headsExaminationsID', headsExaminationsID).update(mouth);
                }
            }
        });
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.addNeckExamination = async (req, res) => {
    const scheme = Joi.object({
        carotidArtery: Joi.any(),
        jugularVein: Joi.any(),
        lymphNodes: Joi.any(),
        neckStiffenss: Joi.any(),
        pembertonsSign: Joi.any(),
        thyroid_gland_testing: Joi.any(),
    });

    const necks = req.body;
    const id = req.params.id;

    const {error} = scheme.validate(necks);
    if (error) return res.status(400).send({'message': error.details[0].message});

    const clinicalInfo = await knex('clinicalForms').where('patientID', id);
    try {
        const neck = new NeckExamination(necks);
        neck.clinicalFormID = clinicalInfo[clinicalInfo.length - 1].id;

        await neck.save();
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.editNeckExamination = async (req, res) => {
    const scheme = Joi.object({
        carotidArtery: Joi.any(),
        jugularVein: Joi.any(),
        lymphNodes: Joi.any(),
        neckStiffenss: Joi.any(),
        pembertonsSign: Joi.any(),
        thyroid_gland_testing: Joi.any(),
    });

    const necks = req.body;
    const id = req.params.id;

    const {error} = scheme.validate(necks);
    if (error) return res.status(400).send({'message': error.details[0].message});

    const neckExamination = await knex('necksExaminations').where('id', id).first();
    try {
        const neck = new NeckExamination(necks);
        neck.clinicalFormID = neckExamination.clinicalFormID;

        await neck.update(id);
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.addChestExamination = async (req, res) => {
    const scheme = Joi.object({
        Compressions: Joi.any(),
        respiratorySounds: Joi.any(),
        visualExamination: Joi.object({
            sideRounded: Joi.any(),
            gynecomastia: Joi.any(),
            orange_skinnedBreast: Joi.any(),
            spiderVeins: Joi.any(),
            barrelChest: Joi.any(),
            sternalPit: Joi.any(),
        })
    });
    const chests = req.body;
    const patientID = req.params.id;

    const {error} = scheme.validate(chests);
    if (error) return res.status(404).send({'message': error.details[0].message});

    const chestExamination = {};
    chestExamination.Compressions = chests.Compressions;
    chestExamination.respiratorySounds = chests.respiratorySounds;
    const clinicalInfo = await knex('clinicalForms').where('patientID', patientID);

    chestExamination.clinicalFormID = clinicalInfo[clinicalInfo.length - 1].id;

    try {
        let chest = await knex('chestsExaminations').insert(chestExamination);
        if (chests.hasOwnProperty('visualExamination')) {
            const visual = chests.visualExamination;
            visual.chestID = chest;
            await knex('visualsChest').insert(visual);
        }
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(400).send({'message': e.message});
    }
}

module.exports.editChestExamination = async (req, res) => {
    const scheme = Joi.object({
        Compressions: Joi.any(),
        respiratorySounds: Joi.any(),
        visualExamination: Joi.object({
            sideRounded: Joi.any(),
            gynecomastia: Joi.any(),
            orange_skinnedBreast: Joi.any(),
            spiderVeins: Joi.any(),
            barrelChest: Joi.any(),
            sternalPit: Joi.any(),
        })
    });
    const oldChests = req.body;
    const id = req.params.id;

    const {error} = scheme.validate(oldChests);
    if (error) return res.status(404).send({'message': error.details[0].message});

    const chestExamination = {};
    chestExamination.Compressions = oldChests.Compressions;
    chestExamination.respiratorySounds = oldChests.respiratorySounds;


    try {
        const chestQuery = await knex('chestsExaminations').where('id', id).first();
        chestExamination.clinicalFormID = chestQuery.clinicalFormID;
        let chest = null;
        if (chestQuery.length > 0) {
            chest = chestQuery[0].id;
            if (oldChests.hasOwnProperty('visualExamination')) {
                const visual = oldChests.visualExamination;
                visual.chestID = chest;
                await knex('visualsChest').where('chestID', chest).update(visual);
            }
        }
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(400).send({'message': e.message});
    }
}

module.exports.addAbdomenExamination = async (req, res) => {
    const scheme = Joi.object({
        Percussion: Joi.object({
            abdominalRumbling: Joi.any(),
            percussiveDullness: Joi.any(),
            in: Joi.any(),
            liverSpan: Joi.any(),
            shiftingDullness: Joi.any(),
        }),
        Palpation: Joi.object({
            macBrownie: Joi.any(),
            murphy: Joi.any(),
            rooftopping: Joi.any(),
            milia: Joi.any(),
            myoclonus: Joi.any(),
        }),
        VisualAbdomen: Joi.object({
            distendedAbdomen: Joi.any(),
            Umbilical_Fold_Disappearance: Joi.any(),
            abdominalRespiration: Joi.any(),
            hernia: Joi.any(),
            sideRounded: Joi.any(),
            rashes: Joi.any(),
            surgicalScar: Joi.any(),
        }),
    });

    const newAbdomen = req.body;
    const patientID = req.params.id;

    const {error} = scheme.validate(newAbdomen);
    if (error) return res.status(400).send({'message': error.details[0].message});

    const clinicalInfo = await knex('clinicalForms').where('patientID', patientID);

    try {
        await knex.transaction(async (trx) => {
            let abdomenExaminationID = await trx('abdomenExamination').insert({'clinicalFormID': clinicalInfo[clinicalInfo.length - 1].id});

            if (newAbdomen.hasOwnProperty('Percussion')) {
                const Percussion = newAbdomen.Percussion;
                Percussion.abdomenID = abdomenExaminationID;
                await trx('percussions').insert(Percussion);
            }
            if (newAbdomen.hasOwnProperty('Palpation')) {
                const Palpation = newAbdomen.Palpation;
                Palpation.abdomenID = abdomenExaminationID;
                await trx('palpations').insert(Palpation);

            }
            if (newAbdomen.hasOwnProperty('VisualAbdomen')) {
                const VisualAbdomen = newAbdomen.VisualAbdomen;
                VisualAbdomen.abdomenID = abdomenExaminationID;
                await trx('visualsAbdomen').insert(VisualAbdomen);

            }
        });
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.editAbdomenExamination = async (req, res) => {
    const scheme = Joi.object({
        Percussion: Joi.object({
            abdominalRumbling: Joi.any(),
            percussiveDullness: Joi.any(),
            in: Joi.any(),
            liverSpan: Joi.any(),
            shiftingDullness: Joi.any(),
        }),
        Palpation: Joi.object({
            macBrownie: Joi.any(),
            murphy: Joi.any(),
            rooftopping: Joi.any(),
            milia: Joi.any(),
            myoclonus: Joi.any(),
        }),
        VisualAbdomen: Joi.object({
            distendedAbdomen: Joi.any(),
            Umbilical_Fold_Disappearance: Joi.any(),
            abdominalRespiration: Joi.any(),
            hernia: Joi.any(),
            sideRounded: Joi.any(),
            rashes: Joi.any(),
            surgicalScar: Joi.any(),
        }),
    });

    const newAbdomen = req.body;
    const id = req.params.id;

    const {error} = scheme.validate(newAbdomen);
    if (error) return res.status(400).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            const abdomens = await knex('abdomenExamination').where('id', id).first();
            if (abdomens === undefined) {
                throw  new Error('id is wrong');
            }
            let abdomenExaminationID = id;
            if (newAbdomen.hasOwnProperty('Percussion')) {
                const Percussion = newAbdomen.Percussion;
                Percussion.abdomenID = abdomenExaminationID;
                await trx('percussions').where('abdomenID', abdomenExaminationID).update(Percussion);
            }
            if (newAbdomen.hasOwnProperty('Palpation')) {
                const Palpation = newAbdomen.Palpation;
                Palpation.abdomenID = abdomenExaminationID;
                await trx('palpations').where('abdomenID', abdomenExaminationID).update(Palpation);
            }
            if (newAbdomen.hasOwnProperty('VisualAbdomen')) {
                const VisualAbdomen = newAbdomen.VisualAbdomen;
                VisualAbdomen.abdomenID = abdomenExaminationID;
                await trx('visualsAbdomen').where('abdomenID', abdomenExaminationID).update(VisualAbdomen);
            }
        });
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.addLimbsExamination = async (req, res) => {
    const scheme = Joi.object({
        LowerLimb: Joi.object({
            inguinal_Lymphadenopathy_Palpation: Joi.any(),
            Venous_Leg_Ulcers: Joi.any(),
            oedema_Assessment: Joi.any(),
        }),
        Manu: Joi.object({
            palmarErythema: Joi.any(),
            purpura: Joi.any(),
            acrocyanosis: Joi.any(),
            myatrophy: Joi.any(),
        }),
        ArticulationUnguisv: Joi.object({
            neurological: Joi.any(),
            xanthonychia: Joi.any(),
            leukonychia: Joi.any(),
            punctateLeukonychia: Joi.any(),
            capillaryDilation: Joi.any(),
            periorbitalCyanosis: Joi.any(),
        }),
    });

    const newLimb = req.body;
    const patientID = req.params.id;

    const {error} = scheme.validate(newLimb);
    if (error) return res.status(400).send({'message': error.details[0].message});

    const clinicalInfo = await knex('clinicalForms').where('patientID', patientID);


    try {
        await knex.transaction(async (trx) => {
            let limbExaminationID = await trx('limbs').insert({'clinicalFormID': clinicalInfo[clinicalInfo.length - 1].id});
            if (newLimb.hasOwnProperty('LowerLimb')) {
                const LowerLimb = newLimb.LowerLimb;
                LowerLimb.limbsID = limbExaminationID;
                await trx('lowerLimps').insert(LowerLimb);
            }
            if (newLimb.hasOwnProperty('Manu')) {
                const Manu = newLimb.Manu;
                Manu.limbsID = limbExaminationID;
                await trx('manus').insert(Manu);
            }
            if (newLimb.hasOwnProperty('ArticulationUnguisv')) {
                const ArticulationUnguisv = newLimb.ArticulationUnguisv;
                ArticulationUnguisv.limbsID = limbExaminationID;
                await trx('articulationsUnguis').insert(ArticulationUnguisv);
            }
        });
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.editLimbsExamination = async (req, res) => {
    const scheme = Joi.object({
        LowerLimb: Joi.object({
            inguinal_Lymphadenopathy_Palpation: Joi.any(),
            Venous_Leg_Ulcers: Joi.any(),
            oedema_Assessment: Joi.any(),
        }),
        Manu: Joi.object({
            palmarErythema: Joi.any(),
            purpura: Joi.any(),
            acrocyanosis: Joi.any(),
            myatrophy: Joi.any(),
        }),
        ArticulationUnguisv: Joi.object({
            neurological: Joi.any(),
            xanthonychia: Joi.any(),
            leukonychia: Joi.any(),
            punctateLeukonychia: Joi.any(),
            capillaryDilation: Joi.any(),
            periorbitalCyanosis: Joi.any(),
        }),
    });

    const oldLimb = req.body;
    const id = req.params.id;

    const {error} = scheme.validate(oldLimb);
    if (error) return res.status(400).send({'message': error.details[0].message});

    try {
        await knex.transaction(async (trx) => {
            const limbs = await knex('limbs').where('id', id);
            if (limbs.length === 0) {
                throw new Error('id is wrong');
            }
            let limbExaminationID = limbs[0].id;
            if (oldLimb.hasOwnProperty('LowerLimb')) {
                const LowerLimb = oldLimb.LowerLimb;
                LowerLimb.limbsID = limbExaminationID;
                await trx('lowerLimps').where('limbsID', limbExaminationID).update(LowerLimb);
            }
            if (oldLimb.hasOwnProperty('Manu')) {
                const Manu = oldLimb.Manu;
                Manu.limbsID = limbExaminationID;
                await trx('manus').where('limbsID', limbExaminationID).update(Manu);
            }
            if (oldLimb.hasOwnProperty('ArticulationUnguisv')) {
                const ArticulationUnguisv = oldLimb.ArticulationUnguisv;
                ArticulationUnguisv.limbsID = limbExaminationID;
                await trx('articulationsUnguis').where('limbsID', limbExaminationID).update(ArticulationUnguisv);

            }
        });
        res.status(200).send({'message': "success"});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}