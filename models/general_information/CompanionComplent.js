const knex = require('../../db');

class CompanionComplent{
    constructor(data) {
        this.timeSituation=data.timeSituation;
        this.catalystRemedies=data.catalystRemedies;
        this.frequencyImprovment=data.frequencyImprovment;
        this.other=data.other;
        this.complentdetailID=data.complentdetailID;
    }
    async save(){
        return await knex('companionsComplents').insert('this');
    }
}

module.exports.CompanionComplent = CompanionComplent ;