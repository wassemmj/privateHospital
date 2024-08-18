const { Doctor } = require('../../models/user_models/Doctor');
const { User } = require('../../models/user_models/User');
const Joi = require('joi').extend(require('@joi/date'));
const knex = require('../../db');
const bcrypt = require("bcrypt");
const _ = require('lodash') ;
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
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.deleteDoctor = async (req , res) => {
    const id = req.params.id ;
    if(isNaN(id) || id <=0) {
        throw new Error('bad request!') ;
    }
    try {
        const result = await knex('doctors').where('id' , '=' , id).first() ;
        if (result === undefined) return res.status(400).send({'message' : 'The doctor not found '}) ;
        const userID = result.userID ;
        console.log(userID) ;
        await knex.transaction(async (trx) => {
            await trx('doctors').where('id' , '=' , id).delete() ;
            await trx('users').where('id' , '=' , userID).delete() ;
        }) ;
        res.status(200).send({'message' : 'done successfully'}) ;
    } catch (e) {
        res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.editDoctor = async (req , res) => {
    const schema = Joi.object({
        fullName : Joi.string().min(3) ,
        phoneNumber : Joi.string().min(10),
        fatherName : Joi.string().min(3),
        motherName : Joi.string().min(3),
        internationalNumber : Joi.string(),
        currentLocation : Joi.string(),
        gender : Joi.boolean(),
        birthdate: Joi.date().format('YYYY-MM-DD').utc() ,
        specialistsID : Joi.number().sign('positive')
    });
    const doctorID = req.params.id ;

    const editDoctor = req.body ;

    const { error } = schema.validate(editDoctor) ;
    if (error) return res.status(404).send({'message' : error.details[0].message}) ;
    try {
        const result = await knex('doctors').where('id' , '=' , doctorID).first() ;
        if (result === undefined){
            return res.status(400).send({'message' : 'The Doctor not found '}) ;
        }
        await knex.transaction(async (trx) => {
            if (editDoctor.hasOwnProperty('specialistsID')) {
                await trx('doctors').where('id' , '=' , doctorID).update('specialistsID',editDoctor.specialistsID) ;
                await trx('users').where('id' , '=' , result.userID).update(_.omit(editDoctor , 'specialistsID')) ;
            } else {
                // await trx('doctors').where('id' , '=' , doctorID).update(editDoctor.specialistsID) ;
                await trx('users').where('id' , '=' , result.userID).update(editDoctor) ;
            }
        }) ;
        res.status(200).send({'message' : 'edited successfully'}) ;
    } catch (e) {
        res.status(404).send({'message' : e.message}) ;
    }
}

module.exports.searchDoctor = async (req , res) => {
    try {
        const doctors = await knex('doctors as d')
            .select('d.id' , 'd.userID' , 'd.specialistsID' , 's.name' ,
                'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
            .join('users as u' , 'u.id' , 'd.userID')
            .join('specialists as s' , 's.id' , 'd.specialistsID')
            .where('fullName', 'like', `%${req.params.string}%`);
        res.status(200).send({doctors : doctors}) ;
    } catch (e) {
        res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.statistics = async (req , res) => {
    try {
        const currentYear = new Date().getFullYear();
        const stats = await knex('patients')
            .select(
                knex.raw("DATE_FORMAT(created_at, '%M') as month_name"),
                knex.raw('COUNT(*) as count')
            )
            .whereRaw('YEAR(created_at) = ?', [currentYear])
            .groupByRaw("DATE_FORMAT(created_at, '%M')")
            .orderByRaw('MONTH(created_at)');

        res.json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}