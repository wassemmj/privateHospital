const knex = require('../../db');

class Internal_Disease_and_Genetic_Disorder{
    constructor(data) {
        this.HTN=data.HTN;
        this.DM=data.DM;
        this.IHD=data.IHD;
        this.CKD=data.CKD;
        this.other=data.other;
        this.startTime=data.startTime;
        this.drugAllergy=data.drugAllergy;
        this.pastmedicalID=data.pastmedicalID;
    }
    async save(){
        return await knex('internal_diseases_and_genetic_disorders').insert(this);
    }
}

module.exports.Internal_Disease_and_Genetic_Disorder = Internal_Disease_and_Genetic_Disorder ;