const knex = require('../../db');

class ArticulationUnguisv{
    constructor(data) {
        this.neurological = data.neurological;
        this.xanthonychia = data.xanthonychia;
        this.leukonychia = data.leukonychia;
        this.punctateLeukonychia = data.punctateLeukonychia;
        this.capillaryDilation = data.capillaryDilation;
        this.periorbitalCyanosis = data.periorbitalCyanosis;
        this.limbsID = data.limbsID;
    }
    async save(){
        return await knex('articulationsUnguis').insert(this);
    }
}

module.exports.ArticulationUnguisv = ArticulationUnguisv ;