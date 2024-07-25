const knex = require('../../db');
const Joi = require('joi');

module.exports.getNotification = async (req , res) => {
    try {
        const id = req.doctor.id ;
        const notification = await knex('notifications').where('doctorID' , id) ;
        return res.status(200).send({'notification': notification});
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
}

module.exports.makeNotificationRead = async (req , res) => {
    try {
        const notID = req.params.id ;
        await knex('notifications').where('id' , notID).update('read_at' , Date.now()) ;
        return res.status(200).send({'message': "done successfully"});
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
}

module.exports.getExamNotification = async (req , res) => {
    try {
        const id = req.nonMedical.id ;
        const notification = await knex('examNotifications').where('nonMedicalID' , id) ;
        return res.status(200).send({'notification': notification});
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
}

module.exports.makeExamNotificationRead = async (req , res) => {
    try {
        const notID = req.params.id ;
        await knex('examNotifications').where('id' , notID).update('read_at' , Date.now()) ;
        return res.status(200).send({'message': "done successfully"});
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
}

module.exports.getRadioNotification = async (req , res) => {
    try {
        const id = req.nonMedical.id ;
        const notification = await knex('radioNotifications').where('nonMedicalID' , id) ;
        return res.status(200).send({'notification': notification});
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
}

module.exports.makeRadioNotificationRead = async (req , res) => {
    try {
        const notID = req.params.id ;
        await knex('radioNotifications').where('id' , notID).update('read_at' , Date.now()) ;
        return res.status(200).send({'message': "done successfully"});
    } catch (e) {
        return res.status(400).send({'message': e.message});
    }
}