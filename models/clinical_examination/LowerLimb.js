const knex = require('../../db');

class LowerLimb{
    constructor(data) {
        this.inguinal_Lymphadenopathy_Palpation = data.inguinal_Lymphadenopathy_Palpation;
        this.Venous_Leg_Ulcers = data.Venous_Leg_Ulcers;
        this.oedema_Assessment = data.oedema_Assessment;
        this.limbsID = data.limbsID;
    }
    async save(){
        return await knex('lowerLimps').insert(this);
    }
}

module.exports.LowerLimb = LowerLimb;