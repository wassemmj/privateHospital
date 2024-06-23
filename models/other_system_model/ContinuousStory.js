const knex = require('../../db') ;

class ContinuousStory {
    constructor(data) {
        this.muscleContusion = data.muscleContusion;
        this.familyMedicalHistory = data.familyMedicalHistory;
        this.allergy = data.allergy;
        this.carrier = data.carrier;
        this.martialStatus = data.martialStatus;
        this.bloodTransfusion = data.bloodTransfusion;
        this.details = data.details;
        this.summary = data.summary;
        this.clinicalFormID = data.clinicalFormID;
    }

    async save() {
        return await knex('continuousStories').insert(this) ;
    }
}

module.exports.ContinuousStory = ContinuousStory ;