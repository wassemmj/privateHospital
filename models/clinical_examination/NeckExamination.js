const knex = require('../../db');

class NeckExamination{
    constructor(data) {
        this.carotidArtery = data.carotidArtery;
        this.jugularVein = data.jugularVein;
        this.lymphNodes = data.lymphNodes;
        this.neckStiffenss = data.neckStiffenss;
        this.pembertonsSign = data.pembertonsSign;
        this.thyroid_gland_testing = data.thyroid_gland_testing;
        this.patientID = data.patientID;
    }
    async save(){
        return await knex('necksExaminations').insert(this);
    }
    async update(patientID){
        await knex('necksExaminations').where('patientID' , patientID).update(this);
    }
}

module.exports.NeckExamination = NeckExamination;