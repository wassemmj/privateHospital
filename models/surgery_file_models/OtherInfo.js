const knex = require('../../db') ;

class OtherInfo {
    constructor(data) {
        this.injuryType = data.injuryType;
        this.ASA = data.ASA;
        this.surgerySituation = data.surgerySituation;
        this.surgeryDuration = data.surgeryDuration;
        this.antipathetic = data.antipathetic;
        this.antipatheticStartDate = data.antipatheticStartDate;
        this.antipatheticStopDate = data.antipatheticStopDate;
        this.surgeryFileID = data.surgeryFileID;
    }

    async save() {
        return await knex('otherInfos').insert(this) ;
    }
}

module.exports.OtherInfo = OtherInfo ;