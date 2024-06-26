const knex = require('../../db');

class NeckExamination{
    constructor(data) {
        this.carotidArtery = data.carotidArtery;
        this.jugularVein = data.jugularVein;
        this.lymphNodes = data.lymphNodes;
        this.neckStiffenss = data.neckStiffenss;
        this.pembertonsSign = data.pembertonsSign;
        this.thyroid_gland_testing = data.thyroid_gland_testing;
        this.clinicalFormID = data.clinicalFormID;
    }
    async save(){
        return await knex('necksExaminations').insert(this);
    }
    async update(id){
        await knex('necksExaminations').where('id' , id).update(this);
    }
}

module.exports.NeckExamination = NeckExamination;