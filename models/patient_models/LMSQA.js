const knex = require('../../db');

class LMSQA{
    constructor(data) {
        this.location = data.location;
        this.severity = data.severity;
        this.movements = data.movements;
        this.quality = data.quality;
        this.association = data.association;
        this.complentdetailID = data.complentdetailID;
    }
    async save(){
        return await knex('lmsqas').insert(this);
    }
}

module.exports.LMSQA =LMSQA ;