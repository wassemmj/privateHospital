const knex = require('../../db') ;

class Specialists {
    constructor(data) {
        this.name = data.name;
        this.floorID = data.floorID;
    }

    async save() {
        await knex('specialists').insert(this);
    }
}

module.exports.Specialists = Specialists ;