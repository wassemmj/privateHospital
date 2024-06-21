const knex = require('../../db');

class Skin{
    constructor(data) {
        this.color=data.color;
        this.natural=data.natural;
        this.other=data.other;
        this.hair=data.hair;
        this.headsExaminationsID=data.headsExaminationsID;
    }
    async save(){
        return await knex('skins').insert(this);
    }
}

module.exports.Skin = Skin;