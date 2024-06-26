const knex = require('../../db');

class VitalSign{
    constructor(data) {
        this.Bp= data.Bp;
        this.Rr= data.Rr;
        this.bodyTempreture= data.bodyTempreture;
        this.heartRate= data.heartRate;
        this.clinicalFormID= data.clinicalFormID;
    }
    async save(){
        return await knex('vitalSigns').insert(this);
    }
    async update(vitalID){
        await knex('vitalSigns').where('id' , vitalID).update(this);
    }
}

module.exports.VitalSign = VitalSign;