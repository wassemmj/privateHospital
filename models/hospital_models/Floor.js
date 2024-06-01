const knex = require('../../db') ;

class Floor {
    constructor() {}

    async save() {
        await knex('floors').insert(this);
    }
}

module.exports.Floor = Floor ;