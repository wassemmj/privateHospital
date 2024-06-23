const knex = require('../../db');

class HeadExamination{
    constructor(data) {
        this.clinicalFormID = data.clinicalFormID;
    }
    async save(){
        return await knex('headsExaminations').insert(this);
    }
}

module.exports.HeadExamination = HeadExamination;