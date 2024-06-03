const knex = require('../../db');

class Vital{
    constructor(data) {
        this.HR =data.HR;
        this.BP =data.BP;
        this.Rr =data.Rr;
        this.Temp =data.Temp;
        this.SPO2 =data.SPO2;
        this.other =data.other;
        this.IntensiveCareID =data.IntensiveCareID;
    }
    async save(){
        return await knex('vitals').insert(this);
    }
}

module.exports.Vital = Vital;