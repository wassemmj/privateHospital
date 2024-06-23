const knex = require('../../db');

class PatientHistory{
    constructor(data) {
        this.smoking = data.smoking;
        this.alcahol = data.alcahol;
        this.other = data.other;
        this.clinicalFormID = data.clinicalFormID;
    }
    async save(){
        return await knex('patientsHistorys').insert(this);
    }
}

module.exports.PatientHistory = PatientHistory ;