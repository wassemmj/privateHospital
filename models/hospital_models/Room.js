const knex = require('../../db') ;

class Room {
    constructor(data) {
        this.roomNumber = data.roomNumber;
        this.floorID = data.floorID;
    }

    async save() {
        await knex('rooms').insert(this);
    }
}

module.exports.Room = Room ;