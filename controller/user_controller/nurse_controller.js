const {Nurse} = require('../../models/user_models/Nurse');
const {User} = require('../../models/user_models/User');
const Joi = require('joi').extend(require('@joi/date'));
const knex = require('../../db');
const bcrypt = require("bcrypt");
const generatePassword = require('./generate');
const _ = require("lodash");

module.exports.getAllNurse = async (req, res) => {
    try {
        const nurses = await knex('nurses as n')
            .select('n.id', 'n.userID', 'fullName', 'fatherName',
                'motherName', 'phoneNumber', 'internationalNumber',
                'currentLocation', 'birthdate', 'gender')
            .join('users as u', 'u.id', 'n.userID');
        nurses.forEach((value) => {
            value.birthdate = new Intl.DateTimeFormat('fr-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date(value.birthdate));
        });
        res.status(200).send({'nurses': nurses});
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
}

module.exports.createNurse = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).required(),
        phoneNumber: Joi.string().min(10).required(),
        fatherName: Joi.string().min(3).required(),
        motherName: Joi.string().min(3).required(),
        internationalNumber: Joi.string().required(),
        currentLocation: Joi.string().required(),
        gender: Joi.boolean().required(),
        birthdate: Joi.date().format('YYYY-MM-DD').utc().required()
    });

    const newNurse = req.body;

    const {error} = schema.validate(newNurse);
    if (error) return res.status(404).send({'message': error.details[0].message});

    const password = generatePassword(8);
    const salt = await bcrypt.genSalt(10);
    newNurse.password = await bcrypt.hash(password, salt);
    const user = new User(newNurse);

    try {
        await knex.transaction(async (trx) => {
            const userID = await trx('users').insert(user);

            const nurse = new Nurse({userID});
            await trx('nurses').insert(nurse);

            res.status(200).send({'message': 'done successfully', 'password': password});
        });
    } catch (e) {
        return res.status(400).send({'message': e});
    }
}

module.exports.deleteNurse = async (req, res) => {
    const id = req.params.id;
    if (isNaN(id) || id <= 0) {
        throw new Error('bad request!');
    }
    try {
        const result = await knex('nurses').where('id', '=', id).first();
        if (result === undefined) return res.status(400).send({'message': 'The nurse not found '});
        const userID = result.userID;
        await knex.transaction(async (trx) => {
            await trx('nurses').where('id', '=', id).delete();
            await trx('users').where('id', '=', userID).delete();
        });
        res.status(200).send({'message': 'done successfully'});
    } catch (e) {
        res.status(400).send({'message': e.message});
    }
}

module.exports.editNurse = async (req, res) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3),
        phoneNumber: Joi.string().min(10),
        fatherName: Joi.string().min(3),
        motherName: Joi.string().min(3),
        internationalNumber: Joi.string(),
        currentLocation: Joi.string(),
        gender: Joi.boolean(),
        birthdate: Joi.date().format('YYYY-MM-DD').utc(),
    });
    const nurseID = req.params.id;

    const editNurse = req.body;

    const {error} = schema.validate(editNurse);
    if (error) return res.status(404).send({'message': error.details[0].message});

    if (isNaN(nurseID) || nurseID <= 0) {
        throw new Error('bad request!');
    }

    try {
        const result = await knex('nurses').where('id', '=', nurseID).first();
        if (result === undefined) {
            return res.status(400).send({'message': 'The Nurse not found '});
        }
        await knex.transaction(async (trx) => {
            await trx('users').where('id', '=', result.userID).update(editNurse);
        });
        res.status(200).send({'message': 'edited successfully'});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.searchNurse = async (req , res) => {
    try {
        const nurses = await knex('nurses as n')
            .select('n.id', 'n.userID', 'fullName', 'fatherName',
                'motherName', 'phoneNumber', 'internationalNumber',
                'currentLocation', 'birthdate', 'gender')
            .join('users as u', 'u.id', 'n.userID')
            .where('fullName', 'like', `%${req.params.string}%`);
        res.status(200).send({nurses : nurses}) ;
    } catch (e) {
        res.status(400).send({'message' : e.message}) ;
    }
}