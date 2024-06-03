const knex = require('../../db') ;

class MannerOfDeath {
    constructor(data) {
        this.normal = data.normal;
        this.notSpecified = data.notSpecified;
        this.nonNormal = data.nonNormal;
        this.deathFileID = data.deathFileID;
    }

    async save() {
        return await knex('mannerOfDeaths').insert(this) ;
    }
}

module.exports.MannerOfDeath = MannerOfDeath ;