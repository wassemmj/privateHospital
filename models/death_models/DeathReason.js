const knex = require('../../db') ;

class DeathReason {
    constructor(data) {
        this.lastMinute = data.lastMinute;
        this.lastDay = data.lastDay;
        this.lastYear = data.lastYear;
        this.reasonLastHour = data.reasonLastHour;
        this.anatomy = data.anatomy;
        this.autopsy = data.autopsy;
        this.deathFileID = data.deathFileID;
    }

    async save() {
        return await knex('deathReasons').insert(this) ;
    }
}

module.exports.DeathReason = DeathReason ;