const knex = require('../../db');
const Joi = require('joi') ;
const cron = require('node-cron');

async function sendConsult(socket , id) {
    const today = new Date();
    let day = today.getDay();
    let hours = today.getHours(); // hours

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayString = dayNames[day]; // day

    const doctors = await knex('doctors').where('specialistsID' , id) ;

    let found = false ;
    let found2 = false ;
    for (let i = 0 ; i < doctors.length ; i++) {
        const doctorsWorking = await knex('doctorWorkingTimes')
            .where('day' , dayString)
            .where('doctorID' , doctors[i].id);
        if (doctorsWorking.length > 0) {
            const startTime = doctorsWorking[0].start.split(',') ;
            const endTime = doctorsWorking[0].end.split(',') ;
            for (let j = 0 ; j < startTime.length ; j++) {
                if (startTime[j] <= hours && endTime[j] > hours) {
                    console.log('ooioi')
                    found = true ;
                    found2 = true ;
                    socket.emit('consult',(data , socket)=>{
                        console.log('giefdskjfsdak');
                        console.log('vvvvvvvvvvvvvv');
                    });
                    console.log("done " + doctorsWorking[0].doctorID) ;
                    break ;
                }
            }
        }
    }
    if (!found) {
        let firstFound = 0 ;
        for (let i = 0 ; i < doctors.length ; i++) {
            const doctorsWorking = await knex('doctorWorkingTimes')
                .where('day' , dayString)
                .where('doctorID' , doctors[i].id);
            if (doctorsWorking.length > 0) {
                const startTime = doctorsWorking[0].start.split(',') ;
                const endTime = doctorsWorking[0].end.split(',') ;
                for (let j = 0 ; j < startTime.length ; j++) {
                    if (firstFound === 0) {
                        if (startTime[j] > hours ) {
                            found2 = true ;
                            firstFound = startTime[j] ;
                            console.log("done " + doctorsWorking[0].doctorID) ;
                            break ;
                        }
                    } else {
                        if (startTime[j] === firstFound) {
                            console.log("done " + doctorsWorking[0].doctorID) ;
                            break ;
                        }
                    }

                }
            }
        }
    }
    while (!found2) {
        day++ ;
        let firstFound = 0 ;
        const newHours = 1;
        const dayString2 = dayNames[day];
        for (let i = 0 ; i < doctors.length ; i++) {
            const doctorsWorking = await knex('doctorWorkingTimes')
                .where('day' , dayString2)
                .where('doctorID' , doctors[i].id);
            if (doctorsWorking.length > 0) {
                const startTime = doctorsWorking[0].start.split(',') ;
                const endTime = doctorsWorking[0].end.split(',') ;
                for (let j = 0 ; j < startTime.length ; j++) {
                    if (firstFound === 0) {
                        if (startTime[j] > newHours) {
                            found2 = true ;
                            firstFound = startTime[j] ;
                            console.log("done " + doctorsWorking[0].doctorID) ;
                            break ;
                        }
                    } else {
                        if (startTime[j] ===firstFound) {
                            console.log("done " + doctorsWorking[0].doctorID) ;
                            break ;
                        }
                    }
                }
            }
        }
    }
}
function dd(socket ) {
    console.log('hghghgh') ;
                    socket.on('consult',async (data )=>{
                        await knex('consults').insert({
                            'consults' : data.consults ,
                            'doctorID' : 1
                        }) ;
                    });
}

module.exports.mmm =  (socket) => {
     dd(socket) ;
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