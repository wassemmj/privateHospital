const knex = require('../../db');

class Limb{
    constructor(data) {
        this.clinicalFormID = data.clinicalFormID;
    }
    async save(){
        return await knex('limbs').insert(this);
    }
}

module.exports.Limb = Limb;