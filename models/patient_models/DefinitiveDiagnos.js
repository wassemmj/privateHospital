const knex=require('../../db');

class DefinitiveDiagnosis{
    constructor(data) {
        this.finalDestination=data.finalDestination;
        this.patientID=data.patientID;
    }
    async save(){
        return await knex('definitiveDiagnosis').insert(this);
    }
}

module.exports.DefinitiveDiagnosis = DefinitiveDiagnosis ;