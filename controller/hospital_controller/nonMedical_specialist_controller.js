const { NonSpecialists } = require('../../models/hospital_models/NonSpecialist');
const knex = require('../../db');
const Joi = require('joi') ;

module.exports.getAllNonMedicalSpecialists = async (req , res) => {
    try {
        const nonSpecialists = await knex('nonSpecialists').select('*');
        res.status(200).send({'nonMedicalSpecialists' : nonSpecialists}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.createSpecialists = async (req , res) => {
    const scheme = Joi.object({
        name : Joi.string().required() ,
    }) ;
    const newSpecialist = req.body ;

    const { error } = scheme.validate(newSpecialist) ;
    if (error) return res.stat(400).send({'message' : error.details[0].message}) ;

    const specialist = new NonSpecialists(newSpecialist) ;
    try {
        await specialist.save() ;

        res.status(200).send({'message' : 'done successfully'}) ;
    } catch (e) {
        res.status(400).send({'message' : e}) ;
    }
}

module.exports.getAllRooms = async (req , res) => {
    try {
       const rooms = await knex('rooms') ;
        res.status(200).send({'rooms' : rooms}) ;
    } catch (e) {
        res.status(400).send({'message' : e}) ;
    }
}