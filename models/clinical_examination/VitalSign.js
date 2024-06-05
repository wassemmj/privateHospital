const knex = require('../../db');

class VitalSign{
    constructor(data) {
        this.Bp= data.Bp;
        this.Rr= data.Rr;
        this.bodyTempreture= data.bodyTempreture;
        this.heartRate= data.heartRate;
        this.patientID= data.patientID;
    }
    async save(){
        return await knex('vitalSigns').insert(this);
    }
}

module.exports.VitalSign = VitalSign;