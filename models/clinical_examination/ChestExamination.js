const knex = require('../../db');

class ChestExamination{
    constructor(data) {
        this.Compressions=data.Compressions;
        this.respiratorySounds=data.respiratorySounds;
        this.patientID=data.patientID;
    }
    async save(){
        return await knex('chestsExaminations').insert(this);
    }
}

module.exports.ChestExamination = ChestExamination;