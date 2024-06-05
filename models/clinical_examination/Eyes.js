const knex = require('../../db');

class Eyes{
    constructor(data) {
        this.pallor=data.pallor;
        this.jaundice=data.jaundice;
        this.Nystagmus=data.Nystagmus;
        this.Enophthalmos=data.Enophthalmos;
        this.Exophthalmos=data.Exophthalmos;
        this.headsExaminationsID=data.headsExaminationsID;
    }
    async save(){
        return await knex('eyes').insert(this);
    }
}

module.exports.Eyes = Eyes ;