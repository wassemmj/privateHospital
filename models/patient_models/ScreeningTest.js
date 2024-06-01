const knex = require('../../db') ;

class ScreeningTest{
    constructor(data) {
        this.askTest = data.askTest;
        this.result = data.result;
        this.patientID = data.patientID;
    }

    async save() {
        return await knex('screeningTests').insert(this) ;
    }
}

module.exports.ScreeningTest = ScreeningTest;