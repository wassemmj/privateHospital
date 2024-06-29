const knex = require('../../db');
const Joi = require('joi') ;
const cron = require('node-cron');

async function sendConsult(id) {
    const today = new Date();
    const day = today.getDay();
    const hours = today.getHours(); // hours

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayString = dayNames[day]; // day

    const doctors = await knex('doctors').where('specialistsID' , id) ;

    let found = false ;
    for (let i = 0 ; i < doctors.length ; i++) {
        const doctorsWorking = await knex('doctorWorkingTimes')
            .where('day' , dayString)
            .where('doctorID' , doctors[i].id);
        if (doctorsWorking.length > 0) {
            const startTime = doctorsWorking[0].start.split(',') ;
            const endTime = doctorsWorking[0].end.split(',') ;
            for (let j = 0 ; j < startTime.length ; j++) {
                if (startTime[j] < hours && endTime[j] > hours) {
                    found = true ;
                    console.log("done " + doctorsWorking[0].doctorID) ;
                }
            }
        }
    }

}

module.exports.makeConsults = async (req , res) => {
    const schema = Joi.object({
        consults : Joi.string().required()
    });

    const doctorID = req.doctor.id;
    const specilistID = req.params.id;

    const newConsult = req.body;

    const {error} = schema.validate(newConsult);
    if (error) return res.status(400).send({'message': error.details[0].message});

    newConsult.doctorID = doctorID;
    try{
        await knex('consults').insert(newConsult) ;
        await sendConsult(specilistID) ;
        res.status(200).send({'message': 'success'});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.addResponse = async (req , res) => {
    const scheme = Joi.object({
        response : Joi.string().required()
    });
    const consultingID = req.params.id ;
    const consultingDoctorID = req.doctor.id;

    const newResponse = req.body;

    const {error} = scheme.validate(newResponse);
    if (error) return res.status(400).send({'message': error.details[0].message});

    newResponse.consultingDoctorID = consultingDoctorID;

    try{
        await knex('consults').where('id' , consultingID).update(newResponse)
        res.status(200).send({'message': 'success'});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.getMyConsultsToResponse = async (req , res) => {
    try {
        const consults = await knex('consults').where('consultingDoctorID' , req.doctor.id) ;
        res.status(200).send({'consults': consults});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}

module.exports.getMyConsults = async (req , res) => {
    try {
        const consults = await knex('consults').where('doctorID' , req.doctor.id) ;
        res.status(200).send({'consults': consults});
    } catch (e) {
        res.status(404).send({'message': e.message});
    }
}