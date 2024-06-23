const knex = require('../../db');

class AbdomenExamination{
    constructor(data) {
        this.clinicalFormID = data.clinicalFormID;
    }
    async save(){
        return await knex('abdomenExamination').insert(this);
    }
}

module.exports.AbdomenExamination = AbdomenExamination ;