const {DoctorWorkingTime} = require('../../models/medical_models/DoctorWorkingTime');
const knex = require('../../db');
const Joi = require('joi');
const _ = require('lodash') ;
const cron = require('node-cron');

module.exports.workingTime = async (req, res) => {
    const timeRegex = /^([01]\d|2[0-4])$/;
    const scheme = Joi.object({
        workingTime: Joi.array().items(Joi.object({
            day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
            startTime: Joi.array().items(Joi.string().pattern(timeRegex).required()),
            endTime: Joi.array().items(Joi.string().pattern(timeRegex).required()),
        })),
    });
    const newWorkingTime = req.body;

    const {error} = scheme.validate(newWorkingTime);
    if (error) return res.status(400).send({'message': error.details[0].message});

    for (let i = 0; i < newWorkingTime.workingTime.length; i++) {
        for (let j = 0; j < newWorkingTime.workingTime[i].startTime.length; j++) {
            if (parseInt(newWorkingTime.workingTime[i].startTime[j]) > parseInt(newWorkingTime.workingTime[i].endTime[j])) {
                return res.status(400).send({'message': 'the start time should be before the end time'})
            }
        }
        for (let j = 1; j < newWorkingTime.workingTime[i].startTime.length; j++) {
            for (let k = 0; k < j; k++) {
                if (parseInt(newWorkingTime.workingTime[i].startTime[j]) < parseInt(newWorkingTime.workingTime[i].endTime[k])) {
                    return res.status(400).send({'message': 'the end time should be after the start time'})
                }
            }
        }
    }

    const doctorWorkingTimes = await knex('doctorWorkingTimes').where('doctorID', req.params.id);

    if (doctorWorkingTimes) {
        await knex('doctorWorkingTimes').where('doctorID', req.params.id).delete();
    }
    try {
        for (let i = 0; i < newWorkingTime.workingTime.length; i++) {
            const day = newWorkingTime.workingTime[i].day;
            const start = newWorkingTime.workingTime[i].startTime.join(',');
            const end = newWorkingTime.workingTime[i].endTime.join(',');
            const data = {
                doctorID: req.params.id,
                day: day,
                start: start,
                end: end,
            };
            const working = new DoctorWorkingTime(data);
            await working.save();
        }
        res.status(200).send({"message": "successes"});
    } catch (e) {
        res.status(400).send({'message': e.message});
    }
}

module.exports.getWorkingTime = async (req, res) => {
    try {
        const workingTime = await knex('doctorWorkingTimes').where('doctorID', req.params.id);
        workingTime.forEach((value) => {
            value.start = value.start.split(',');
            value.end = value.end.split(',');
        });
        res.status(200).send({'workingTime': workingTime});
    } catch (e) {
        res.status(404).send({'message': e.message})
    }

}

module.exports.getSpecialistTime = async (req, res) => {
    try {
        const times = await knex('doctorWorkingTimes as dw')
            .select('d.id ', 'd.specialistsID', 'dw.day', 'dw.start', 'dw.end', 'dw.id as workingID')
            .join('doctors as d', 'd.id', 'dw.doctorID')
            .where('d.specialistsID', req.params.id);

        const tt = {} ;

        times.forEach((value) => {
            value.start = value.start.split(',');
            value.end = value.end.split(',');
            if (tt.hasOwnProperty(value.day)) {
                tt[value.day].push(value) ;
            } else {
                tt[value.day] = [] ;
                tt[value.day].push(value) ;
            }
        });

        res.status(200).send({'times': tt})
    } catch (e) {
        res.status(404).send({'message': e.message})
    }
}