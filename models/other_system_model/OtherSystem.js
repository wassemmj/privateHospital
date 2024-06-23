const knex = require('../../db') ;

class OtherSystem {
    constructor(data) {
        this.clinicalFormID = data.clinicalFormID;
    }

    async save() {
        return await knex('otherSystems').insert(this) ;
    }
}

module.exports.OtherSystem = OtherSystem ;