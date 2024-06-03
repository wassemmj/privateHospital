const knex = require('../../db');

class VisualAbdomen{
    constructor(data) {
        this.distendedAbdomen = data.distendedAbdomen;
        this.Umbilical_Fold_Disappearance = data.Umbilical_Fold_Disappearance;
        this.abdominalRespiration = data.abdominalRespiration;
        this.hernia = data.hernia;
        this.sideRounded = data.sideRounded;
        this.rashes = data.rashes;
        this.surgicalScar = data.surgicalScar;
        this.abdomenID = data.abdomenID;
    }
    async save(){
        return await knex('visualsAbdomen').insert(this);
    }
}

module.exports.VisualAbdomen = VisualAbdomen ;