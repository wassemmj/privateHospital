const knex = require('../../db');

class Percussion{
    constructor(data) {
        this.abdominalRumbling = data.abdominalRumbling;
        this.percussiveDullness = data.percussiveDullness;
        this.in = data.in;
        this.liverSpan = data.liverSpan;
        this.shiftingDullness = data.shiftingDullness;
        this.abdomenID = data.abdomenID;
    }
    async save(){
        return await knex('percussions').insert(this);
    }
}

module.exports.Percussion = Percussion;