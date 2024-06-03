const knex = require('../../db');

class VisualChest{
    constructor(data) {
        this.sideRounded = data.sideRounded;
        this.gynecomastia = data.gynecomastia;
        this.orange_skinnedBreast = data.orange_skinnedBreast;
        this.spiderVeins = data.spiderVeins;
        this.barrelChest = data.barrelChest;
        this.sternalPit = data.sternalPit;
        this.chestID = data.chestID;
    }
    async save(){
        return await knex('visualsChest').insert(this);
    }
}

module.exports.VisualChest = VisualChest;