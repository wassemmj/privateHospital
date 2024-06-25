const {ContinuousStory} = require('../models/other_system_model/ContinuousStory');

const knex = require('../db');
const Joi = require('joi');
const {PatientHistory} = require("../models/general_information/PatientHistory");

module.exports.otherSystem = async (req, res) => {
    const schema = Joi.object({
        Heead: Joi.object({
            headache: Joi.any(),
            vision: Joi.any(),
            earBuzz: Joi.any(),
            rotor: Joi.any(),
            plaid: Joi.any(),
            other: Joi.any(),
            details: Joi.any()
        }),
        neck: Joi.object({
            difficulty_Swallowing: Joi.any(),
            senseOfBulging: Joi.any(),
            hoarseness: Joi.any(),
            details: Joi.any()
        }),
        chest: Joi.object({
            chestgeneral : Joi.object({
                chestPain: Joi.any(),
                palm: Joi.any(),
                cough: Joi.any(),
                other: Joi.any()
            }),
            slipofbreath: Joi.object({
                type: Joi.any(),
                degree: Joi.any(),
                improvement: Joi.any()
            })
        }),
        abdomenarea: Joi.object({
            nausea: Joi.object({
                quantity: Joi.any(),
                frequency: Joi.any(),
                comfortable: Joi.any(),
                qualities: Joi.any(),
                lmsqa: Joi.any()
            }),
            diarrheal: Joi.object({
                quantity: Joi.any(),
                frequency: Joi.any(),
                smell: Joi.any(),
                qualities: Joi.any(),
                lmsqa: Joi.any()
            }),
            constipation: Joi.object({
                frequency: Joi.any(),
                color: Joi.any(),
                pain: Joi.any(),
                mandatory: Joi.any(),
                zahir: Joi.any(),
                lmsqa: Joi.any()
            })
        }),
        excretory: Joi.object({
            dysuria: Joi.any(),
            urethralStricture: Joi.any(),
            urinaryIncontinence: Joi.any(),
            overactiveBladder: Joi.any()
        }),
        Other: Joi.object({
            myalgia: Joi.any(),
            arthralgia: Joi.any(),
            peripheralNeuropathy: Joi.any()
        })
    });

    const newOtherSystem = req.body;
    const clinicalform = await knex('clinicalForms').where('patientID', req.params.id);

    const {error} = schema.validate(newOtherSystem);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try{
        await knex.transaction(async (trx)=>{
            const clinicalformID = clinicalform[clinicalform.length-1].id;
            otherSystem = await trx('otherSystems').insert({'clinicalFormID': clinicalformID});

            if (newOtherSystem.hasOwnProperty('Heead')){
                const head = newOtherSystem.Heead;
                head.otherID = otherSystem;
                await trx('heads').insert(head);
            }

            if (newOtherSystem.hasOwnProperty('neck')){
                const neck = newOtherSystem.neck;
                neck.otherID = otherSystem;
                await trx('necks').insert(neck);
            }

            if (newOtherSystem.hasOwnProperty('chest')){
                const chest = newOtherSystem.chest;

                if (chest.hasOwnProperty('chestgeneral')){
                    const chestgeneral = chest.chestgeneral;
                    chestgeneral.otherID = otherSystem;
                    const chestID = await trx('chests').insert(chestgeneral);

                    if (chest.hasOwnProperty('slipofbreath')){
                        const slipofbreath = chest.slipofbreath;
                        slipofbreath.chestID = chestID;
                        await trx('slipOfBreaths').insert(slipofbreath);
                    }
                }
            }

            if (newOtherSystem.hasOwnProperty('abdomenarea')){
                const abdomenarea = newOtherSystem.abdomenarea;
                abdomenarea.otherID = otherSystem;
                const abdomenareaID = await trx('abdomenAreas').insert({'otherID' : otherSystem});

                if (abdomenarea.hasOwnProperty('nausea')){
                    const nausea = abdomenarea.nausea;
                    nausea.abdomenAreaID = abdomenareaID;
                    await trx('nauseas').insert(nausea);
                }

                if (abdomenarea.hasOwnProperty('diarrheal')){
                    const diarrheal = abdomenarea.diarrheal;
                    diarrheal.abdomenAreaID = abdomenareaID;
                    await trx('diarrheals').insert(diarrheal);
                }

                if (abdomenarea.hasOwnProperty('constipation')){
                    const constipation = abdomenarea.constipation;
                    constipation.abdomenAreaID = abdomenareaID;
                    await trx('constipations').insert(constipation);
                }
            }

            if (newOtherSystem.hasOwnProperty('excretory')){
                const excretory = newOtherSystem.excretory;
                excretory.otherID = otherSystem;
                await trx('excretories').insert(excretory);
            }

            if (newOtherSystem.hasOwnProperty('Other')){
                const Other = newOtherSystem.Other;
                Other.otherID = otherSystem;
                await trx('others').insert(Other);
            }
            res.status(200).send({'message': "saved successfully"});
        })
    }catch (e){
        return res.status(400).send({'message': e.message});
    }

};

module.exports.continuousstory = async (req,res)=>{
    const schema = Joi.object({
        muscleContusion : Joi.any(),
        familyMedicalHistory : Joi.any(),
        allergy : Joi.any(),
        carrier : Joi.any(),
        martialStatus : Joi.any(),
        bloodTransfusion : Joi.any(),
        details : Joi.any(),
        summary : Joi.any()
    });

    const newContinuousStory = req.body;
    const clinicalform = await knex('clinicalForms').where('patientID', req.params.id);

    const {error} = schema.validate(newContinuousStory);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try{
        const continuousStory = new ContinuousStory(newContinuousStory);
        continuousStory.clinicalFormID = clinicalform[clinicalform.length - 1].id;
        await continuousStory.save();

        res.status(200).send({'message': "saved successfully"});
    }catch (e){
        return res.status(400).send({'message': e.message});
    }

};

module.exports.editotherSystem = async (req,res)=>{
    const schema = Joi.object({
        Heead: Joi.object({
            headache: Joi.any(),
            vision: Joi.any(),
            earBuzz: Joi.any(),
            rotor: Joi.any(),
            plaid: Joi.any(),
            other: Joi.any(),
            details: Joi.any()
        }),
        neck: Joi.object({
            difficulty_Swallowing: Joi.any(),
            senseOfBulging: Joi.any(),
            hoarseness: Joi.any(),
            details: Joi.any()
        }),
        chest: Joi.object({
            chestgeneral : Joi.object({
                chestPain: Joi.any(),
                palm: Joi.any(),
                cough: Joi.any(),
                other: Joi.any()
            }),
            slipofbreath: Joi.object({
                type: Joi.any(),
                degree: Joi.any(),
                improvement: Joi.any()
            })
        }),
        abdomenarea: Joi.object({
            nausea: Joi.object({
                quantity: Joi.any(),
                frequency: Joi.any(),
                comfortable: Joi.any(),
                qualities: Joi.any(),
                lmsqa: Joi.any()
            }),
            diarrheal: Joi.object({
                quantity: Joi.any(),
                frequency: Joi.any(),
                smell: Joi.any(),
                qualities: Joi.any(),
                lmsqa: Joi.any()
            }),
            constipation: Joi.object({
                frequency: Joi.any(),
                color: Joi.any(),
                pain: Joi.any(),
                mandatory: Joi.any(),
                zahir: Joi.any(),
                lmsqa: Joi.any()
            })
        }),
        excretory: Joi.object({
            dysuria: Joi.any(),
            urethralStricture: Joi.any(),
            urinaryIncontinence: Joi.any(),
            overactiveBladder: Joi.any()
        }),
        Other: Joi.object({
            myalgia: Joi.any(),
            arthralgia: Joi.any(),
            peripheralNeuropathy: Joi.any()
        })
    });

    const newOtherSystem = req.body;
    const {error} = schema.validate(newOtherSystem);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try{
        await knex.transaction(async (trx)=>{
            const othersystemID = req.params.id ;
            if (isNaN(othersystemID) || othersystemID <=0) {
                throw new Error('bad request!') ;
            }

            if (newOtherSystem.hasOwnProperty('Heead')){
                const head = newOtherSystem.Heead;
                await trx('heads').where("otherID" , othersystemID).update(head);
            }

            if (newOtherSystem.hasOwnProperty('neck')){
                const neck = newOtherSystem.neck;
                await trx('necks').where("otherID" , othersystemID).update(neck);
            }

            if (newOtherSystem.hasOwnProperty('chest')){
                const chest = newOtherSystem.chest;

                if (chest.hasOwnProperty('chestgeneral')){
                    const chestgeneral = chest.chestgeneral;
                    const chestID = await trx('chests').select('id').where("otherID" , othersystemID);
                    await trx('chests').where("otherID" , othersystemID).update(chestgeneral);
                    console.log(chestID);
                    const chestIID = chestID[0].id;
                    console.log(chestIID);
                    if (chest.hasOwnProperty('slipofbreath')){
                        const slipofbreath = chest.slipofbreath;
                        await trx('slipOfBreaths').where("chestID" , chestIID).update(slipofbreath);
                    }
                }
            }

            if (newOtherSystem.hasOwnProperty('abdomenarea')){
                const abdomenarea = newOtherSystem.abdomenarea;
                const abdomenareaID = await trx('abdomenAreas').select('id').where("otherID" , othersystemID);
                const abdomenareaIID = abdomenareaID[0].id;
                if (abdomenarea.hasOwnProperty('nausea')){
                    const nausea = abdomenarea.nausea;
                    await trx('nauseas').where("abdomenAreaID" , abdomenareaIID).update(nausea);
                }

                if (abdomenarea.hasOwnProperty('diarrheal')){
                    const diarrheal = abdomenarea.diarrheal;
                    await trx('diarrheals').where("abdomenAreaID" , abdomenareaIID).update(diarrheal);
                }

                if (abdomenarea.hasOwnProperty('constipation')){
                    const constipation = abdomenarea.constipation;
                    await trx('constipations').where("abdomenAreaID" , abdomenareaIID).update(constipation);
                }
            }

            if (newOtherSystem.hasOwnProperty('excretory')){
                const excretory = newOtherSystem.excretory;
                await trx('excretories').where("otherID" , othersystemID).update(excretory);
            }

            if (newOtherSystem.hasOwnProperty('Other')){
                const Other = newOtherSystem.Other;
                await trx('others').where("otherID" , othersystemID).update(Other);
            }
            res.status(200).send({'message': "updated successfully"});
        });
    }catch (e){
        return res.status(400).send({'message' : e.message}) ;
    }
};

module.exports.editcontinuousstory = async (req,res)=>{
    const schema = Joi.object({
        muscleContusion : Joi.any(),
        familyMedicalHistory : Joi.any(),
        allergy : Joi.any(),
        carrier : Joi.any(),
        martialStatus : Joi.any(),
        bloodTransfusion : Joi.any(),
        details : Joi.any(),
        summary : Joi.any()
    });

    const newcontinuousstory = req.body;
    const {error} = schema.validate(newcontinuousstory);
    if (error) return res.status(404).send({'message': error.details[0].message});

    try{
        await knex.transaction(async (trx)=>{
            const id = req.params.id ;
            if (isNaN(id) || id <=0) {
                throw new Error('bad request!') ;
            }

            await trx('continuousStories').where('id' , id).update(newcontinuousstory);
            res.status(200).send({'message': "updated successfully"});
        })
    }catch (e){
        return res.status(400).send({'message' : e.message}) ;
    }
};
