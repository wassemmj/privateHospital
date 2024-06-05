const knex = require('../../db');

class VisualExamination{
    constructor(data) {
        this.goodCondition=data.goodCondition;
        this.cachecticPatient=data.cachecticPatient;
        this.conscience=data.conscience;
        this.gcs=data.gcs;
        this.patientID=data.patientID;
    }
    async save(){
        return await knex('visualExaminations').insert(this);
    }
}

module.exports.VisualExamination = VisualExamination ;