const knex = require('../../db') ;

class Patient {
    constructor(data) {
        this.fullName = data.fullName;
        this.motherName = data.motherName;
        this.fatherName = data.fatherName;
        this.phoneNumber = data.phoneNumber;
        this.internationalNumber = data.internationalNumber ;
        this.currentLocation = data.currentLocation;
        this.birthdate = data.birthdate ;
        this.gender = data.gender ;
        this.work = data.work ;
        this.socialStatus = data.socialStatus ;
        this.roomID = data.roomID ;
    }

    async save() {
        return await knex('patients').insert(this) ;
    }
}

module.exports.Patient = Patient ;