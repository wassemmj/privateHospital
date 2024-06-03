const knex = require('../../db') ;

class OtherSystem {
    constructor(data) {
        this.patientID = data.patientID;
    }

    async save() {
        return await knex('otherSystems').insert(this) ;
    }
}

module.exports.OtherSystem = OtherSystem ;