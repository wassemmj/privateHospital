const knex = require('../../db');

class SergonHistory{
    constructor(data) {
        this.sergon=data.sergon;
        this.history=data.history;
        this.tumbers=data.tumbers;
        this.pastmedicalID=data.pastmedicalID;
    }
    async save(){
        return await knex('sergonsHistorys').insert(this);
    }
}

module.exports.SergonHistory = SergonHistory ;