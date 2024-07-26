const knex = require('../../db');
const Joi = require('joi') ;

module.exports.askScreeningTest = async (req , res) => {
    const scheme = Joi.object({
        askTest : Joi.string().required() ,
    }) ;

    const patientID = req.params.id ;
    const newTest = req.body ;

    const { error } = scheme.validate(newTest) ;
    if (error) return res.status(400).send({message : error.details[0].message}) ;

    try {
        newTest.patientID = patientID ;
        await knex('screeningTests').insert(newTest) ;
        res.status(200).send({message : "succeeded"})
    } catch (error) {
        res.status(404).send({message : error.message}) ;
    }
}

module.exports.addScreeningTestResult = async (req , res) => {
    const scheme = Joi.object({
        result : Joi.string().required() ,
    }) ;

    const screenTestID = req.params.id ;
    const newResult = req.body ;

    const { error } = scheme.validate(newResult) ;
    if (error) return res.status(400).send({message : error.details[0].message}) ;

    try {
        const oo = await knex('screeningTests').where("id" , screenTestID).update('result' ,newResult.result) ;
        if (oo === 0) {
            throw new Error("error happened") ;
        }
        res.status(200).send({message : "succeeded"})
    } catch (error) {
        res.status(404).send({message : error.message})
    }
}

module.exports.getTestNotResponse = async (req , res) => {
    try {
        const tests = await knex('screeningTests').whereNull('result') ;
        res.status(200).send({tests : tests})
    } catch (error) {
        res.status(404).send({message : error.message}) ;
    }
}

module.exports.getPatientScreeningTests = async (req , res) => {
    try {
        const tests = await knex('screeningTests').where('patientID' , req.params.id) ;
        res.status(200).send({tests : tests})
    } catch (error) {
        res.status(404).send({message : error.message}) ;
    }
}