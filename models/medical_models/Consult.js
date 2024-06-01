const knex = require('../../db') ;

class Consult {
    constructor(data) {
        this.doctorID = data.doctorID;
        this.consultingDoctorID = data.consultingDoctorID;
        this.response = data.response;
    }

    async save() {
        return await knex('consults').insert(this) ;
    }
}

module.exports.Consult = Consult ;