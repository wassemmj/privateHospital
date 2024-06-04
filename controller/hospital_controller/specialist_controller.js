const { Specialists } = require('../../models/hospital_models/Specialists');
const knex = require('../../db');
const Joi = require('joi') ;

module.exports.getAllSpecialists = async (req , res) => {
    try {
        const specialists = await knex('specialists').select('*');
        res.status(200).send({'specialists' : specialists}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.getSpecialistsFloor = async (req , res) => {
    try {
        const specialists = await knex('specialists')
            .select('*')
            .where('floorID' , '=' , req.params.id);
        res.status(200).send({'specialists' : specialists}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.getSpecialistsByFloor = async (req , res) => {
    try {
        const floors = await knex('specialists')
            .select('floorID')
            .groupBy('floorID');
        const specialistsByFloor = {};
        for (const floor of floors) {
            const { floorID } = floor;
            specialistsByFloor[`${floorID}`] =  [];
        }
        const specialists = await knex('specialists')
            .select('*');
        specialists.forEach((value) => {
            specialistsByFloor[`${value.floorID}`].push(value) ;
        }) ;
        res.status(200).send(specialistsByFloor) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.createSpecialists = async (req , res) => {
    const scheme = Joi.object({
        name : Joi.string().required() ,
        floorID : Joi.number().required() ,
    }) ;
    const newSpecialist = req.body ;

    const { error } = scheme.validate(newSpecialist) ;
    if (error) return res.stat(400).send({'message' : error.details[0].message}) ;

    const specialist = new Specialists(newSpecialist) ;
    try {
        await specialist.save() ;

        res.status(200).send({'message' : 'done successfully'}) ;
    } catch (e) {
        res.status(400).send({'message' : e}) ;
    }
}