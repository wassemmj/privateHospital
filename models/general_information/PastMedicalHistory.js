const knex = require('../../db');

class PastMedicalHistory{
    constructor(data) {
        this.patientID=data.patientID;
    }
    async save(){
        return await knex('pastMedicalHistorys').insert('this');
    }
}

module.exports.PastMedicalHistory = PastMedicalHistory ;