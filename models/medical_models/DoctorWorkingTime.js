const knex = require('../../db') ;

class DoctorWorkingTime {
    constructor(data) {
        this.doctorID = data.doctorID;
        this.day = data.day;
        this.start = data.start;
        this.end = data.end;
    }

    async save() {
        return await knex('doctorWorkingTimes').insert(this) ;
    }
}

module.exports.DoctorWorkingTime = DoctorWorkingTime ;