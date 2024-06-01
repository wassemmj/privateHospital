const knex = require('../../db');

class ComplentDetail{
    constructor(data) {
        this.story = data.story;
        this.startTime = data.startTime;
        this.startSituation = data.startSituation;
        this.catalyst = data.catalyst;
        this.remedies = data.remedies;
        this.complentsFrequency = data.complentsFrequency;
        this.complentsImprovment = data.complentsImprovment;
        this.patientID = data.patientID;
    }
    async save(){
        return await knex('complentsDetails').insert(this);
    }
}

module.exports.ComplentDetail = ComplentDetail ;