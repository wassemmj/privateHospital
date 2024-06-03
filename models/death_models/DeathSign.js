const knex = require('../../db') ;

class DeathSign {
    constructor(data) {
        this.liverMortiseLocation = data.liverMortiseLocation;
        this.liverMortiseImprove = data.liverMortiseImprove;
        this.liverMortiseColor = data.liverMortiseColor;
        this.liverMortiseRemoved = data.liverMortiseRemoved;
        this.rigorMortiseLocation = data.rigorMortiseLocation;
        this.dehydration = data.dehydration;
        this.lateSigns = data.lateSigns;
        this.deathFileID = data.deathFileID;
    }

    async save() {
        return await knex('deathSigns').insert(this) ;
    }
}

module.exports.DeathSign = DeathSign ;