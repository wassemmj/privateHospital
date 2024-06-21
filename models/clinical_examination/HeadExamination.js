const knex = require('../../db');

class HeadExamination{
    constructor(data) {
        this.patientID = data.patientID;
    }
    async save(){
        return await knex('headsExaminations').insert(this);
    }
}

module.exports.HeadExamination = HeadExamination;