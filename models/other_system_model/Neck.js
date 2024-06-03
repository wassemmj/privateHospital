const knex = require('../../db') ;

class Neck {
    constructor(data) {
        this.difficulty_Swallowing = data.difficulty_Swallowing;
        this.senseOfBulging = data.senseOfBulging;
        this.hoarseness = data.hoarseness;
        this.details = data.details;
        this.otherID = data.otherID;
    }

    async save() {
        return await knex('necks').insert(this) ;
    }
}

module.exports.Neck = Neck ;