const knex = require('../../db') ;

class Radiograph {
    constructor(data) {
        this.doctorID = data.doctorID;
        this.patientID = data.patientID;
        this.askRadiographs = data.askRadiographs;
        this.document = data.document;
        this.image = data.image;
    }

    async save() {
        return await knex('radiographs').insert(this) ;
    }
}

module.exports.Radiograph = Radiograph ;