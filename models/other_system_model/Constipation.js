const knex = require('../../db') ;

class Constipation {
    constructor(data) {
        this.frequency = data.frequency;
        this.color = data.color;
        this.pain = data.pain;
        this.mandatory = data.mandatory;
        this.zahir = data.zahir;
        this.abdomenAreaID = data.abdomenAreaID;
    }

    async save() {
        return await knex('constipations').insert(this) ;
    }
}

module.exports.Constipation = Constipation ;