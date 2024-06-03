const knex = require('../../db');

class Changable{
    constructor(data) {
        this.shift =data.shift;
        this.PIV =data.PIV;
        this.CVC =data.CVC;
        this.PICC =data.PICC;
        this.site =data.site;
        this.fluidRate =data.fluidRate;
        this.other =data.other;
        this.IntensiveCareID =data.IntensiveCareID;
    }
    async save(){
        return await knex('changables').insert(this);
    }
}

module.exports.Changable = Changable;