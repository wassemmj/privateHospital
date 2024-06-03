const knex = require('../../db') ;

class DischargeSummarySheet {
    constructor(data) {
        this.specialistDoctor = data.specialistDoctor;
        this.inChargeDoctor = data.inChargeDoctor;
        this.final = data.final;
        this.entryReason = data.entryReason;
        this.summaryStory = data.summaryStory;
        this.tests = data.tests;
        this.procedures = data.procedures;
        this.surgeons = data.surgeons;
        this.treatments = data.treatments;
        this.finalSituation = data.finalSituation;
        this.guidelines = data.guidelines;
        this.patientID = data.patientID;
    }

    async save() {
        return await knex('dischargeSummarySheets').insert(this) ;
    }
}

module.exports.DischargeSummarySheet = DischargeSummarySheet ;