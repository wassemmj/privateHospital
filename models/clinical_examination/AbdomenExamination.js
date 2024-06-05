const knex = require('../../db');

class AbdomenExamination{
    constructor(data) {
        this.patientID = data.patientID;
    }
    async save(){
        return await knex('abdomenExamination').insert(this);
    }
}

module.exports.AbdomenExamination = AbdomenExamination ;