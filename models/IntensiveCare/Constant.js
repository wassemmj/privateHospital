const knex = require('../../db');

class Constant{
    constructor(data) {
        this.currentProblem =data.currentProblem;
        this.allergies =data.allergies;
        this.activity =data.activity;
        this.neuro =data.neuro;
        this.diet =data.diet;
        this.resp =data.resp;
        this.GL =data.GL;
        this.skin =data.skin;
        this.cardiac =data.cardiac;
        this.pain =data.pain;
        this.M_S =data.M_S;
        this.RUE =data.RUE;
        this.RLE =data.RLE;
        this.LUE =data.LUE;
        this.LLE =data.LLE;
        this.GU =data.GU;
        this.voidStatus =data.voidStatus;
        this.lastBM =data.lastBM;
        this.medicalHistory =data.medicalHistory;
        this.recentProcedure =data.recentProcedure;
        this.IONote =data.IONote;
        this.other =data.other;
        this.IntensivecareID =data.IntensivecareID;
    }
    async save(){
        return await knex('constants').insert(this);
    }
}

module.exports.Constant = Constant;