const knex = require('../../db') ;

class Other {
    constructor(data) {
        this.myalgia = data.myalgia;
        this.arthralgia = data.arthralgia;
        this.peripheralNeuropathy = data.peripheralNeuropathy;
        this.otherID = data.otherID;
    }

    async save() {
        return await knex('others').insert(this) ;
    }
}

module.exports.Other = Other ;