const knex = require('../../db') ;

class Diarrheal {
    constructor(data) {
        this.quantity = data.quantity;
        this.frequency = data.frequency;
        this.smell = data.smell;
        this.qualities = data.qualities;
        this.abdomenAreaID = data.abdomenAreaID;
    }

    async save() {
        return await knex('diarrheals').insert(this) ;
    }
}

module.exports.Diarrheal = Diarrheal ;