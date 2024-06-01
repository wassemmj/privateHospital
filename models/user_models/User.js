const knex = require('../../db') ;

class User {
    constructor(data) {
        this.fullName = data.fullName;
        this.motherName = data.motherName;
        this.fatherName = data.fatherName;
        this.phoneNumber = data.phoneNumber;
        this.password = data.password;
        this.internationalNumber = data.internationalNumber ;
        this.currentLocation = data.currentLocation;
        this.birthdate = data.birthdate ;
        this.gender = data.gender ;
    }

    async save() {
        return await knex('users').insert(this) ;
    }
}

module.exports.User = User ;