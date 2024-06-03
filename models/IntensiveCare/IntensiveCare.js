const knex = require('../../db');

class IntensiveCare{
    constructor(data) {
        this.RoomID =data.RoomID;
        this.ptInitial =data.ptInitial;
        this.POA =data.POA;
        this.code =data.code;
        this.HT =data.HT;
        this.WT =data.WT;
        this.isolation =data.isolation;
        this.accucheck =data.accucheck;
        this.restraints =data.restraints;
        this.admitDate =data.admitDate;
        this.meds =data.meds;
        this.RN =data.RN;
        this.Instructor =data.Instructor;
        this.patientID =data.patientID;
    }
    async save(){
        return await knex('intensiveCares').insert(this);
    }
}

module.exports.IntensiveCare = IntensiveCare;