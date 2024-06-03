const knex = require('../../db') ;

class DeathFile {
    constructor(data) {
        this.identityStatus = data.identityStatus;
        this.temperature = data.temperature;
        this.deathLocation = data.deathLocation;
        this.deathDate = data.deathDate;
        this.deathHour = data.deathHour;
        this.doctorName = data.doctorName;
        this.fileDate = data.fileDate;
        this.deathSeen = data.deathSeen;
        this.patientID = data.patientID;
    }

    async save() {
        return await knex('deathFiles').insert(this) ;
    }
}

module.exports.DeathFile = DeathFile ;