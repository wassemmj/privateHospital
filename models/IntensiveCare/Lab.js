const knex = require('../../db');

class Lab{
    constructor(data) {
        this.k =data.k;
        this.MG =data.MG;
        this.NA =data.NA;
        this.CA =data.CA;
        this.Troponin =data.Troponin;
        this.BNP =data.BNP;
        this.EF =data.EF;
        this.PT =data.PT;
        this.INR =data.INR;
        this.ALT =data.ALT;
        this.AST =data.AST;
        this.HGP =data.HGP;
        this.HCT =data.HCT;
        this.RBC =data.RBC;
        this.WBC =data.WBC;
        this.Albumin =data.Albumin;
        this.Platelet =data.Platelet;
        this.CR =data.CR;
        this.BUN =data.BUN;
        this.GFR =data.GFR;
        this.PO2 =data.PO2;
        this.PCO2 =data.PCO2;
        this.HCO3 =data.HCO3;
        this.PH =data.PH;
        this.chol =data.chol;
        this.lipid =data.lipid;
        this.LDL =data.LDL;
        this.HDL =data.HDL;
        this.other =data.other;
        this.IntensivecareID =data.IntensivecareID;
    }
    async save(){
        return await knex('labs').insert(this);
    }
}

module.exports.Lab = Lab;