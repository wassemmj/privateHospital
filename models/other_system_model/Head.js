const knex = require('../../db') ;

class Head {
    constructor(data) {
        this.headache = data.headache;
        this.vision = data.vision;
        this.earBuzz = data.earBuzz;
        this.rotor = data.rotor;
        this.plaid = data.plaid;
        this.other = data.other;
        this.details = data.details;
        this.otherID = data.otherID;
    }

    async save() {
        return await knex('heads').insert(this) ;
    }
}

module.exports.Head = Head ;