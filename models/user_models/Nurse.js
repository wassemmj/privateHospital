const knex = require('../../db') ;

class Nurse {
    constructor(data) {
        this.userID = data.userID;
    }

    async save() {
        return await knex('nurses').insert(this) ;
    }
}

module.exports.Nurse = Nurse ;