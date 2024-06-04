const { Doctor } = require('../../models/user_models/Doctor');
const { User } = require('../../models/user_models/User');
const Joi = require('joi').extend(require('@joi/date'));
const knex = require('../../db');
const bcrypt = require("bcrypt");
const generatePassword = require('./generate');

module.exports.getAllDoctor = async (req , res) => {
    try {
        const doctors = await knex('doctors as d')
            .select('d.id' , 'd.userID' , 'd.specialistsID' , 's.name' ,
                'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
            .join('users as u' , 'u.id' , 'd.userID')
            .join('specialists as s' , 's.id' , 'd.specialistsID');
        doctors.forEach((value) => {
            value.birthdate = new Intl.DateTimeFormat('fr-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date (value.birthdate)) ;
        }) ;
        res.status(200).send({'doctors' : doctors}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.getSpecialistDoctor = async (req , res) => {
    try {
        const doctors = await knex('doctors as d')
            .select('d.id' , 'd.userID' , 'd.specialistsID' , 's.name' ,
                'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
            .join('users as u' , 'u.id' , 'd.userID')
            .join('specialists as s' , 's.id' , 'd.specialistsID')
            .where('d.specialistsID' , '=', req.params.id);
        doctors.forEach((value) => {
            value.birthdate = new Intl.DateTimeFormat('fr-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date (value.birthdate)) ;
        }) ;
        res.status(200).send({'doctors' : doctors}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.getFloorsDoctor = async (req , res) => {
    try {
        const doctors = await knex('doctors as d')
            .select('d.id' , 'd.userID'  , 's.floorID', 'd.specialistsID' , 's.name' ,
                'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
            .join('users as u' , 'u.id' , 'd.userID')
            .join('specialists as s' , 's.id' , 'd.specialistsID')
            .where('s.floorID' , '=', req.params.id);
        doctors.forEach((value) => {
            value.birthdate = new Intl.DateTimeFormat('fr-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date (value.birthdate)) ;
        }) ;
        res.status(200).send({'doctors' : doctors}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.getDoctorDetails = async (req , res) => {
    try {
        const doctors = await knex('doctors as d')
            .select('d.id' , 'd.userID' , 'd.specialistsID' , 's.name' ,
                'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
            .join('users as u' , 'u.id' , 'd.userID')
            .join('specialists as s' , 's.id' , 'd.specialistsID')
            .where('d.id' , '=', req.params.id);
        doctors.forEach((value) => {
            value.birthdate = new Intl.DateTimeFormat('fr-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date (value.birthdate)) ;
        }) ;
        res.status(200).send({'doctor' : doctors[0]}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.createDoctor = async (req , res) => {
    const schema = Joi.object({
        fullName : Joi.string().min(3).required() ,
        phoneNumber : Joi.string().min(10).required(),
        fatherName : Joi.string().min(3).required(),
        motherName : Joi.string().min(3).required(),
        internationalNumber : Joi.string().required(),
        currentLocation : Joi.string().required(),
        gender : Joi.boolean().required(),
        birthdate: Joi.date().format('YYYY-MM-DD').utc().required()
    });
    const specialistsID = req.params.id ;

    const newDoctor = req.body ;

    const { error } = schema.validate(newDoctor) ;
    if (error) return res.status(404).send({'message' : error.details[0].message}) ;

    const password = generatePassword(8) ;
    const salt = await bcrypt.genSalt(10);
    newDoctor.password = await bcrypt.hash(password , salt);
    const user = new User(newDoctor) ;

    try {
        await knex.transaction(async (trx) => {
            const userID = await trx('users').insert(user);

            const doctor = new Doctor({userID , specialistsID}) ;
            await trx('doctors').insert(doctor);

            res.status(200).send({'message' : 'done successfully' , 'password' : password}) ;
        }) ;
    } catch (e) {
        if ('ER_NO_REFERENCED_ROW_2' === e.code) {
            return res.status(400).send({'message' : 'the specialist id is wrong'}) ;
        }
        return res.status(400).send({'message' : e}) ;
    }
}