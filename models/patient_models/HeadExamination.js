const knex = require('../../db');

class HeadExamination{
    constructor(data) {
        this.patientID = data.patientID;
        this.eyesID = data.eyesID;
        this.skinsID = data.skinsID;
        this.mouthsID = data.mouthsID;
    }
    async save(){
        return await knex('headsExaminations').insert(this);
    }
}

module.exports.HeadExamination = HeadExamination;