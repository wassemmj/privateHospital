const knex = require('../../db') ;

class Nausea {
    constructor(data) {
        this.quantity = data.quantity;
        this.frequency = data.frequency;
        this.comfortable = data.comfortable;
        this.qualities = data.qualities;
        this.abdomenAreaID = data.abdomenAreaID;
    }

    async save() {
        return await knex('nauseas').insert(this) ;
    }
}

module.exports.Nausea = Nausea ;