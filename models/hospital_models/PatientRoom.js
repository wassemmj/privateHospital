const knex = require('../../db') ;

class PatientRoom {
    constructor(data) {
        this.roomID = data.roomID;
        this.patientID = data.patientID;
    }

    async save() {
        await knex('patientRoom').insert(this);
    }
}

module.exports.PatientRoom = PatientRoom ;