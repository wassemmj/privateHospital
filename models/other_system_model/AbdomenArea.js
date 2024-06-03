const knex = require('../../db') ;

class AbdomenArea {
    constructor(data) {
        this.lmsqa = data.lmsqa;
        this.otherID = data.otherID;
    }

    async save() {
        return await knex('abdomenAreas').insert(this) ;
    }
}

module.exports.AbdomenArea = AbdomenArea ;