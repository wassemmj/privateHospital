const { NonMedical } = require('../../models/user_models/NonMedical');
const { User } = require('../../models/user_models/User');
const Joi = require('joi').extend(require('@joi/date'));
const knex = require('../../db');
const bcrypt = require("bcrypt");
const generatePassword = require('./generate');
const _ = require("lodash");

module.exports.getAllNonMedical = async (req , res) => {
    try {
        const nonMedical = await knex('nonMedicals as nm')
            .select('nm.id' , 'nm.userID' , 'nm.nonSpecialistsID' , 'ns.name' ,
                'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
            .join('users as u' , 'u.id' , 'nm.userID')
            .join('nonSpecialists as ns' , 'ns.id' , 'nm.nonSpecialistsID');
        res.status(200).send({'nonMedical' : nonMedical}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.getNonMedicalDetails = async (req , res) => {
    try {
        const nonMedical = await knex('nonMedicals as nm')
            .select('nm.id' , 'nm.userID' , 'nm.nonSpecialistsID' , 'ns.name' ,
                'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
            .join('users as u' , 'u.id' , 'nm.userID')
            .join('nonSpecialists as ns' , 'ns.id' , 'nm.nonSpecialistsID')
            .where('nm.id' ,'=' ,req.params.id);
        res.status(200).send({'nonMedical' : nonMedical[0]}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.getNonMedicalSpecialist = async (req , res) => {
    try {
        const nonMedical = await knex('nonMedicals as nm')
            .select('nm.id' , 'nm.userID' , 'nm.nonSpecialistsID' , 'ns.name' ,
                'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
            .join('users as u' , 'u.id' , 'nm.userID')
            .join('nonSpecialists as ns' , 'ns.id' , 'nm.nonSpecialistsID')
            .where('ns.id' ,'=' ,req.params.id);
        res.status(200).send({'nonMedicals' : nonMedical}) ;
    } catch (e) {
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.createAccount = async (req , res) => {
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
    const nonSpecialistsID = req.params.id ;

    const newNonMedical = req.body ;

    const { error } = schema.validate(newNonMedical) ;
    if (error) return res.status(404).send({'message' : error.details[0].message}) ;

    const password = generatePassword(8) ;
    const salt = await bcrypt.genSalt(10);
    newNonMedical.password = await bcrypt.hash(password , salt);
    const user = new User(newNonMedical) ;

    try {
        await knex.transaction(async (trx) => {
            const userID = await trx('users').insert(user);

            const nonMedical = new NonMedical({userID , nonSpecialistsID}) ;
            await trx('nonMedicals').insert(nonMedical);

            res.status(200).send({'message' : 'done successfully' , 'password' : password}) ;
        }) ;
    } catch (e) {
        if ('ER_NO_REFERENCED_ROW_2' === e.code) {
            return res.status(400).send({'message' : 'the specialist id is wrong'}) ;
        }
        return res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.deleteAccount = async (req , res) => {
    const id = req.params.id ;
    if(isNaN(id) || id <=0) {
        throw new Error('bad request!') ;
    }
    try {
        const result = await knex('nonMedicals').where('id' , '=' , id).first() ;
        if (result === undefined) return res.status(400).send({'message' : 'The nonMedicals not found '}) ;
        const userID = result.userID ;
        await knex.transaction(async (trx) => {
            await trx('nonMedicals').where('id' , '=' , id).delete() ;
            await trx('users').where('id' , '=' , userID).delete() ;
        }) ;
        res.status(200).send({'message' : 'done successfully'}) ;
    } catch (e) {
        res.status(400).send({'message' : e.message}) ;
    }
}

module.exports.editAccount = async (req , res) => {
    const schema = Joi.object({
        fullName : Joi.string().min(3) ,
        phoneNumber : Joi.string().min(10),
        fatherName : Joi.string().min(3),
        motherName : Joi.string().min(3),
        internationalNumber : Joi.string(),
        currentLocation : Joi.string(),
        gender : Joi.boolean(),
        birthdate: Joi.date().format('YYYY-MM-DD').utc() ,
        nonSpecialistsID : Joi.number().sign('positive')
    });
    const nonMedicalID = req.params.id ;

    const editNonMedical = req.body ;

    const { error } = schema.validate(editNonMedical) ;
    if (error) return res.status(404).send({'message' : error.details[0].message}) ;

    if(isNaN(nonMedicalID) || nonMedicalID <=0) {
        throw new Error('bad request!') ;
    }

    try {
        const result = await knex('nonMedicals').where('id' , '=' , nonMedicalID).first() ;
        if (result === undefined){
            return res.status(400).send({'message' : 'The nonMedical not found '}) ;
        }
        await knex.transaction(async (trx) => {
            if (editNonMedical.hasOwnProperty('nonSpecialistsID')) {
                await trx('nonMedicals').where('id' , '=' , nonMedicalID).update('nonSpecialistsID',editNonMedical.nonSpecialistsID) ;
                await trx('users').where('id' , '=' , result.userID).update(_.omit(editNonMedical , 'nonSpecialistsID')) ;
            } else {
                await trx('users').where('id' , '=' , result.userID).update(editNonMedical) ;
            }
        }) ;
        res.status(200).send({'message' : 'edited successfully'}) ;
    } catch (e) {
        res.status(404).send({'message' : e.message}) ;
    }
}