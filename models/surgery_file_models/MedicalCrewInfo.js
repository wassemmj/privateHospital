const knex = require('../../db') ;

class MedicalCrewInfo {
    constructor(data) {
        this.surgeonName = data.surgeonName;
        this.helperSurgeonName = data.helperSurgeonName;
        this.nurseName = data.nurseName;
        this.surgeonRoomNumber = data.surgeonRoomNumber;
        this.surgeryName = data.surgeryName;
        this.helperNurse = data.helperNurse;
        this.surgeryFileID = data.surgeryFileID;
    }

    async save() {
        return await knex('medicalCrewInfos').insert(this) ;
    }
}

module.exports.MedicalCrewInfo = MedicalCrewInfo ;