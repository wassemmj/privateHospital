const knex = require('../../db');

class Manu{
    constructor(data) {
        this.palmarErythema = data.palmarErythema;
        this.purpura = data.purpura;
        this.acrocyanosis = data.acrocyanosis;
        this.myatrophy = data.myatrophy;
        this.limbsID = data.limbsID;
    }
    async save(){
        return await knex('manus').insert(this);
    }
}

module.exports.Manu = Manu;