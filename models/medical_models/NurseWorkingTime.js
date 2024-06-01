const knex = require('../../db') ;

class NurseWorkingTime {
    constructor(data) {
        this.nurseID = data.nurseID;
        this.day = data.day;
        this.start = data.start;
        this.end = data.end;
    }

    async save() {
        return await knex('nurseWorkingTimes').insert(this) ;
    }
}

module.exports.NurseWorkingTime = NurseWorkingTime ;