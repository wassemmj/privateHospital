const knex = require('../../db') ;

class Chest {
    constructor(data) {
        this.chestPain = data.chestPain;
        this.palm = data.palm;
        this.cough = data.cough;
        this.other = data.other;
        this.otherID = data.otherID;
    }

    async save() {
        return await knex('chests').insert(this) ;
    }
}

module.exports.Chest = Chest ;