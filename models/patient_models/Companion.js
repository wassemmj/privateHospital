const knex = require('../../db');
const {mountpath} = require("express/lib/application");

class Companion{
    constructor(data) {
        this.fullName = data.fullName;
        this.phoneNumber = data.phoneNumber;
        this.internationalNumber = data.internationalNumber;
        this.patientID=data.patientID;
    }
    async save(){
        return  await knex('companions').insert(this);
    }
}

module.exports.Companion = Companion;