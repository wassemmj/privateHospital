const { VitalSign } = require('../../models/clinical_examination/VitalSign');
const { VisualExamination } = require('../../models/clinical_examination/VisualExamination');
const { NeckExamination } = require('../../models/clinical_examination/NeckExamination');
const knex = require('../../db');
const Joi = require('joi') ;

module.exports.addVitalSigns = async (req , res) => {
    const scheme = Joi.object({
        Bp : Joi.any() ,
        Rr : Joi.any(),
        bodyTempreture : Joi.any(),
        heartRate : Joi.any() ,
    }) ;

    const newVital = req.body ;
    const patientID = req.params.id ;

    const { error } = scheme.validate(newVital) ;
    if(error) return res.status(400).send({'message' : error.details[0].message}) ;
    try {
        const vital = new VitalSign(newVital) ;
        vital.patientID = patientID ;
        const have = await knex('vitalSigns').where('patientID' , patientID) ;
        if (have.length > 0) {
            await vital.update(patientID) ;
        } else {
            await vital.save() ;
        }
        res.status(200).send({'message' : 'success'}) ;
    } catch (e) {
        res.status(404).send({'message' : e.message}) ;
    }
}

module.exports.addVisualExamination = async (req , res) => {
    const scheme = Joi.object({
        goodCondition : Joi.any() ,
        cachecticPatient : Joi.any(),
        conscience : Joi.string().valid('Alert_and_Responsive','Mental_Confusion','Unconscious' , null),
        gcs : Joi.any() ,
    }) ;

    const newVisual = req.body ;
    const patientID = req.params.id ;

    const { error } = scheme.validate(newVisual) ;
    if(error) return res.status(400).send({'message' : error.details[0].message}) ;
    try {
        const visual = new VisualExamination(newVisual) ;
        visual.patientID = patientID ;
        const have = await knex('visualExaminations').where('patientID' , patientID) ;
        if (have.length > 0) {
            await knex('visualExaminations').where('patientID' , patientID).update(visual) ;
        } else {
            await visual.save() ;
        }
        res.status(200).send({'message' : 'success'}) ;
    } catch (e) {
        res.status(404).send({'message' : e.message}) ;
    }
}

module.exports.addHeadExamination = async (req , res) => {
    const scheme = Joi.object({
        skin : Joi.object({
            color : Joi.any() ,
            natural : Joi.any() ,
            other : Joi.any() ,
            hair : Joi.any() ,
        }) ,
        eyes : Joi.object({
            pallor : Joi.any(),
            jaundice : Joi.any(),
            Nystagmus : Joi.any(),
            Enophthalmos : Joi.any(),
            Exophthalmos : Joi.any(),
        }) ,
        mouth : Joi.object({
            atrophicGlossitis : Joi.any() ,
            macroglossia : Joi.any() ,
            color : Joi.any() ,
            toothDecay : Joi.any() ,
            Macrogingivae : Joi.any() ,
            gingivalBleeding : Joi.any() ,
            Ulcers : Joi.any() ,
        }) ,
    }) ;

    const newHead = req.body ;
    const patientID = req.params.id ;

    const { error } = scheme.validate(newHead) ;
    if(error) return res.status(400).send({'message' : error.details[0].message}) ;

    try {
        await knex.transaction(async (trx) => {
            const heads = await knex('headsExaminations').where('patientID' , patientID) ;
            let headsExaminationsID = 0 ;
            if (heads.length > 0) {
                headsExaminationsID  = heads[0].id ;
            } else {
                headsExaminationsID = await trx('headsExaminations').insert({'patientID' : patientID}) ;
            }
            if (newHead.hasOwnProperty('skin')) {
                const skin = newHead.skin ;
                skin.headsExaminationsID = headsExaminationsID ;
                if (heads.length > 0) {
                    await trx('skins').where('headsExaminationsID' , headsExaminationsID).update(skin) ;
                } else {
                    await trx('skins').insert(skin) ;
                }
            }
            if (newHead.hasOwnProperty('eyes')) {
                const eyes = newHead.eyes ;
                eyes.headsExaminationsID = headsExaminationsID ;
                if (heads.length > 0) {
                    await trx('eyes').where('headsExaminationsID' , headsExaminationsID).update(eyes) ;
                } else {
                    await trx('eyes').insert(eyes) ;
                }
            }
            if (newHead.hasOwnProperty('mouth')) {
                const mouth = newHead.mouth ;
                mouth.headsExaminationsID = headsExaminationsID ;
                if (heads.length > 0) {
                    await trx('mouths').where('headsExaminationsID' , headsExaminationsID).update(mouth) ;
                } else {
                    await trx('mouths').insert(mouth) ;
                }
            }
        }) ;
        res.status(200).send({'message' : "success"}) ;
    } catch (e) {
        res.status(404).send({'message' : e.message}) ;
    }
}

module.exports.addNeckExamination = async (req , res) => {
    const scheme = Joi.object({
        carotidArtery : Joi.any() ,
        jugularVein : Joi.any() ,
        lymphNodes : Joi.any() ,
        neckStiffenss : Joi.any() ,
        pembertonsSign : Joi.any() ,
        thyroid_gland_testing : Joi.any() ,
    }) ;

    const necks = req.body ;
    const id = req.params.id ;

    const { error } = scheme.validate(necks) ;
    if (error) return res.status(400).send({'message' : error.details[0].message}) ;
    necks.patientID = id ;
    try {
        const neckExam = await knex('necksExaminations').where('patientID' , id) ;
        const neck = new NeckExamination(necks) ;
        if (neckExam.length > 0) {
            await neck.update(id) ;
        } else {
            await neck.save() ;
        }
        res.status(200).send({'message' : "success"}) ;
    } catch (e) {
        res.status(404).send({'message' : e.message}) ;
    }
}

module.exports.addChestExamination = async (req , res) => {
    const scheme = Joi.object({
        Compressions : Joi.any() ,
        respiratorySounds : Joi.any() ,
        visualExamination : Joi.object({
            sideRounded : Joi.any() ,
            gynecomastia : Joi.any() ,
            orange_skinnedBreast : Joi.any() ,
            spiderVeins : Joi.any() ,
            barrelChest : Joi.any() ,
            sternalPit : Joi.any() ,
        })
    }) ;
    const chests = req.body ;
    const patientID = req.params.id ;

    const { error } = scheme.validate(chests) ;
    if (error) return res.status(404).send({'message' : error.details[0].message}) ;

    const chestExamination = {} ;
    chestExamination.Compressions = chests.Compressions ;
    chestExamination.respiratorySounds = chests.respiratorySounds ;
    chestExamination.patientID = patientID ;

    try {
        const chestQuery = await knex('chestsExaminations').where('patientID' , patientID) ;
        let chest = null ;
        if (chestQuery.length > 0) {
            chest = chestQuery[0].id ;
        } else {
            chest = await knex('chestsExaminations').insert(chestExamination) ;
        }
        if (chestQuery.length > 0) {
            const visual = chests.visualExamination ;
            visual.chestID = chest ;
            await knex('visualsChest').where('chestID' , chest).update(visual) ;
        } else {
            const visual = chests.visualExamination ;
            visual.chestID = chest ;
            await knex('visualsChest').insert(visual) ;
        }
        res.status(200).send({'message' : "success"}) ;
    } catch (e) {
        res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.addAbdomenExamination = async (req , res) => {
    const scheme = Joi.object({
        Percussion : Joi.object({
            abdominalRumbling : Joi.any() ,
            percussiveDullness : Joi.any() ,
            in : Joi.any() ,
            liverSpan : Joi.any() ,
            shiftingDullness : Joi.any() ,
        }) ,
        Palpation : Joi.object({
            macBrownie : Joi.any(),
            murphy : Joi.any(),
            rooftopping : Joi.any(),
            milia : Joi.any(),
            myoclonus : Joi.any(),
        }) ,
        VisualAbdomen : Joi.object({
            distendedAbdomen : Joi.any() ,
            Umbilical_Fold_Disappearance : Joi.any() ,
            abdominalRespiration : Joi.any() ,
            hernia : Joi.any() ,
            sideRounded : Joi.any() ,
            rashes : Joi.any() ,
            surgicalScar : Joi.any() ,
        }) ,
    }) ;

    const newAbdomen = req.body ;
    const patientID = req.params.id ;

    const { error } = scheme.validate(newAbdomen) ;
    if(error) return res.status(400).send({'message' : error.details[0].message}) ;

    try {
        await knex.transaction(async (trx) => {
            const abdomens = await knex('abdomenExamination').where('patientID' , patientID) ;
            let abdomenExaminationID = 0 ;
            if (abdomens.length > 0) {
                abdomenExaminationID  = abdomens[0].id ;
            } else {
                abdomenExaminationID = await trx('abdomenExamination').insert({'patientID' : patientID}) ;
            }
            if (newAbdomen.hasOwnProperty('Percussion')) {
                const Percussion = newAbdomen.Percussion ;
                Percussion.abdomenID = abdomenExaminationID ;
                if (abdomens.length > 0) {
                    await trx('percussions').where('abdomenID' , abdomenExaminationID).update(Percussion) ;
                } else {
                    await trx('percussions').insert(Percussion) ;
                }
            }
            if (newAbdomen.hasOwnProperty('Palpation')) {
                const Palpation = newAbdomen.Palpation ;
                Palpation.abdomenID = abdomenExaminationID ;
                if (abdomens.length > 0) {
                    await trx('palpations').where('abdomenID' , abdomenExaminationID).update(Palpation) ;
                } else {
                    await trx('palpations').insert(Palpation) ;
                }
            }
            if (newAbdomen.hasOwnProperty('VisualAbdomen')) {
                const VisualAbdomen = newAbdomen.VisualAbdomen ;
                VisualAbdomen.abdomenID = abdomenExaminationID ;
                if (abdomens.length > 0) {
                    await trx('visualsAbdomen').where('abdomenID' , abdomenExaminationID).update(VisualAbdomen) ;
                } else {
                    await trx('visualsAbdomen').insert(VisualAbdomen) ;
                }
            }
        }) ;
        res.status(200).send({'message' : "success"}) ;
    } catch (e) {
        res.status(404).send({'message' : e.message}) ;
    }
}

module.exports.addLimbsExamination = async (req , res) => {
    const scheme = Joi.object({
        LowerLimb : Joi.object({
            inguinal_Lymphadenopathy_Palpation : Joi.any() ,
            Venous_Leg_Ulcers : Joi.any() ,
            oedema_Assessment : Joi.any() ,
        }) ,
        Manu : Joi.object({
            palmarErythema : Joi.any(),
            purpura : Joi.any(),
            acrocyanosis : Joi.any(),
            myatrophy : Joi.any(),
        }) ,
        ArticulationUnguisv : Joi.object({
            neurological : Joi.any() ,
            xanthonychia : Joi.any() ,
            leukonychia : Joi.any() ,
            punctateLeukonychia : Joi.any() ,
            capillaryDilation : Joi.any() ,
            periorbitalCyanosis : Joi.any() ,
        }) ,
    }) ;

    const newLimb = req.body ;
    const patientID = req.params.id ;

    const { error } = scheme.validate(newLimb) ;
    if(error) return res.status(400).send({'message' : error.details[0].message}) ;

    try {
        await knex.transaction(async (trx) => {
            const limbs = await knex('limbs').where('patientID' , patientID) ;
            let limbExaminationID = 0 ;
            if (limbs.length > 0) {
                limbExaminationID  = limbs[0].id ;
            } else {
                limbExaminationID = await trx('limbs').insert({'patientID' : patientID}) ;
            }
            if (newLimb.hasOwnProperty('LowerLimb')) {
                const LowerLimb = newLimb.LowerLimb ;
                LowerLimb.limbsID = limbExaminationID ;
                if (limbs.length > 0) {
                    await trx('lowerLimps').where('limbsID' , limbExaminationID).update(LowerLimb) ;
                } else {
                    await trx('lowerLimps').insert(LowerLimb) ;
                }
            }
            if (newLimb.hasOwnProperty('Manu')) {
                const Manu = newLimb.Manu ;
                Manu.limbsID = limbExaminationID ;
                if (limbs.length > 0) {
                    await trx('manus').where('limbsID' , limbExaminationID).update(Manu) ;
                } else {
                    await trx('manus').insert(Manu) ;
                }
            }
            if (newLimb.hasOwnProperty('ArticulationUnguisv')) {
                const ArticulationUnguisv = newLimb.ArticulationUnguisv ;
                ArticulationUnguisv.limbsID = limbExaminationID ;
                if (limbs.length > 0) {
                    await trx('articulationsUnguis').where('limbsID' , limbExaminationID).update(ArticulationUnguisv) ;
                } else {
                    await trx('articulationsUnguis').insert(ArticulationUnguisv) ;
                }
            }
        }) ;
        res.status(200).send({'message' : "success"}) ;
    } catch (e) {
        throw e ;
        res.status(404).send({'message' : e.message}) ;
    }
}