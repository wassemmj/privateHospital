const knex = require('../../db');

class Limb{
    constructor(data) {
        this.patientID = data.patientID;
    }
    async save(){
        return await knex('limbs').insert(this);
    }
}

module.exports.Limb = Limb;