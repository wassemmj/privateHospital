const knex = require('../../db') ;

class SurgeryFile {
    constructor(data) {
        this.patientID = data.patientID;
    }

    async save() {
        return await knex('surgeryFiles').insert(this) ;
    }
}

module.exports.SurgeryFile = SurgeryFile ;