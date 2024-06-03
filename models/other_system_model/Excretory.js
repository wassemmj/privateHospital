const knex = require('../../db') ;

class Excretory {
    constructor(data) {
        this.dysuria = data.dysuria;
        this.urethralStricture = data.urethralStricture;
        this.urinaryIncontinence = data.urinaryIncontinence;
        this.overactiveBladder = data.overactiveBladder;
        this.otherID = data.otherID;
    }

    async save() {
        return await knex('excretories').insert(this) ;
    }
}

module.exports.Excretory = Excretory ;