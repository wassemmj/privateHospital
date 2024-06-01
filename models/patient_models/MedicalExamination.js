const knex = require('../../db') ;

class MedicalExamination {
    constructor(data) {
        this.doctorID = data.doctorID;
        this.patientID = data.patientID;
        this.askExaminations = data.askExaminations;
        this.response = data.response;
    }

    async save() {
        return await knex('medicalExaminations').insert(this) ;
    }
}

module.exports.MedicalExamination = MedicalExamination ;