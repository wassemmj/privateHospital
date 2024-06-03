const knex = require('../../db') ;

class SlipOfBreath {
    constructor(data) {
        this.type = data.type;
        this.degree = data.degree;
        this.improvement = data.improvement;
        this.chestID = data.chestID;
    }

    async save() {
        return await knex('slipOfBreaths').insert(this) ;
    }
}

module.exports.SlipOfBreath = SlipOfBreath ;