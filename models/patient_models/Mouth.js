const knex = require('../../db');

class Mouth{
    constructor(data) {
        this.atrophicGlossitis=data.atrophicGlossitis;
        this.macroglossia=data.macroglossia;
        this.color=data.color;
        this.toothDecay=data.toothDecay;
        this.Macrogingivae=data.Macrogingivae;
        this.gingivalBleeding=data.gingivalBleeding;
        this.Ulcers=data.Ulcers;
        this.headsExaminationsID=data.headsExaminationsID;
    }
    async save(){
        return await knex('mouths').insert(this);
    }
}

module.exports.Mouth = Mouth;