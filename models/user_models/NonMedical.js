const knex = require('../../db') ;

class NonMedical {
    constructor(data) {
        this.userID = data.userID;
        this.nonSpecialistsID = data.nonSpecialistsID;
    }

    async save() {
        return await knex('nonMedicals').insert(this) ;
    }
}

module.exports.NonMedical = NonMedical ;