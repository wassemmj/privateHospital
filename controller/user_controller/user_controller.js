const Joi = require('joi').extend(require('@joi/date'));
const knex = require('../../db');
const bcrypt = require("bcrypt");
const _ = require('lodash') ;
const jwt = require("jsonwebtoken");

module.exports.login = async (req , res) => {
    const scheme = Joi.object({
        password : Joi.string().min(8).required() ,
        specialist : Joi.number() ,
        type : Joi.string().required() ,
    }) ;
    const login = req.body ;

    const { error } = scheme.validate(login) ;
    if (error) return res.status(400).send({'message' : error.details[0].message}) ;

    try {
        let user = null;
        if (login.type === 'Doctor') {
            const query = await knex('doctors as d')
                .select('d.id' , 'd.userID' , 'd.specialistsID' , 's.name' , 'u.password' ,
                    'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                    'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
                .join('users as u' , 'u.id' , 'userID')
                .join('specialists as s' , 's.id' , 'd.specialistsID')
                .where('d.specialistsID' , '=' , login.specialist);
            console.log(query) ;
            for (let value of query) {
                const password = await bcrypt.compare(login.password,value.password) ;
                if (password) {
                    user = value;
                    break ;
                }
            }
            if (user === null) {
                return res.status(400).send({'message' : 'password is wrong'}) ;
            }
        }
        else if (login.type === 'Nurse') {
            const query = await knex('nurses as n')
                .select('n.id' , 'n.userID'  , 'fullName' , 'fatherName' , 'password' ,
                    'motherName' , 'phoneNumber' , 'internationalNumber' ,
                    'currentLocation' , 'birthdate' , 'gender')
                .join('users as u' , 'u.id' , 'userID' );
            for (let value of query) {
                const password = await bcrypt.compare(login.password,value.password) ;
                console.log(password) ;
                if (password) {
                    user = value;
                    break ;
                }
            }
            if (user === null) {
                return res.status(400).send({'message' : 'password is wrong'}) ;
            }

        }
        else {
            const query = await knex('nonMedicals as nm')
                .select('nm.id' , 'u.password', 'nm.userID' , 'nm.nonSpecialistsID' , 'ns.name' ,
                    'fullName' , 'fatherName' , 'motherName' , 'phoneNumber' ,
                    'internationalNumber' , 'currentLocation' , 'birthdate' , 'gender')
                .join('users as u' , 'u.id' , 'nm.userID')
                .join('nonSpecialists as ns' , 'ns.id' , 'nm.nonSpecialistsID')
                .where('nm.nonSpecialistsID' , '=' , login.specialist);
            for (let value of query) {
                const password = await bcrypt.compare(login.password,value.password) ;
                if (password) {
                    user = value;
                    break ;
                }
            }
            if (user === null) {
                return res.status(400).send({'message' : 'password is wrong'}) ;
            }
        }
        let token = '' ;
        if (login.type === 'Nurse') {
            token = jwt.sign({id : user.id, userID : user.userID, type : login.type} , 'MySecureKey' );
        } else {
            token = jwt.sign({id : user.id, userID : user.userID, type : scheme.type , specialist: user.name} , 'MySecureKey' );
        }
        user.type = login.type ;
        res.status(200).send({'message' : 'login successfully','user' : _.omit(user , 'password') , 'token' : token}) ;
    } catch (e) {
        return res.status(404).send({'message' : e.message}) ;
    }
}