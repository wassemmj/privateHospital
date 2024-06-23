const knex = require('../../db');

class PastMedicalHistory{
    constructor(data) {
        this.clinicalFormID=data.clinicalFormID;
    }
    async save(){
        return await knex('pastMedicalHistorys').insert('this');
    }
}

module.exports.PastMedicalHistory = PastMedicalHistory ;