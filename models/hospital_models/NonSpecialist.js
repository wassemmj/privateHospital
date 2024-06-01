const knex = require('../../db') ;

class NonSpecialists {
    constructor(data) {
        this.name = data.name;
    }

    async save() {
        await knex('nonSpecialists').insert(this);
    }
}

module.exports.NonSpecialists = NonSpecialists ;