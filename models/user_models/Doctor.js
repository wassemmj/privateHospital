const knex = require('../../db') ;

class Doctor {
    constructor(data) {
        this.userID = data.userID;
        this.specialistsID = data.specialistsID;
    }

    async save() {
        return await knex('doctors').insert(this) ;
    }
}

module.exports.Doctor = Doctor ;