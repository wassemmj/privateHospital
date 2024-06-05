const knex = require('../../db');

class Palpation{
    constructor(data) {
        this.macBrownie = data.macBrownie;
        this.murphy = data.murphy;
        this.rooftopping = data.rooftopping;
        this.milia = data.milia;
        this.myoclonus = data.myoclonus;
        this.abdomenID = data.abdomenID;
    }
    async save(){
        return await knex('palpations').insert(this);
    }
}

module.exports.Palpation = Palpation ;
