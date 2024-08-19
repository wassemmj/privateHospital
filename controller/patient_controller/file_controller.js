const knex = require('../../db');
const Joi = require('joi').extend(require('@joi/date'));
const PDFDocument = require('pdfkit');
const fs = require('fs');
const {object} = require("joi");

module.exports.create_pdfFile = async (req,res) => {
    const clinicalForms = {} ;
    const examinationPdf = {};
    const dischargeSummarySheetsPdf = {};
    try{
        const patientID = req.params.id;
        // Fetch data from MySQL using Knex
        // const data = await knex('patients').where("id" , patientID);

        const patient = await knex('patients').where('id' , patientID).first() ;
        const ccccc = await knex('clinicalForms').where('patientID' , patientID).orderBy('id', 'desc').first();
        const id = ccccc['id'] ;
        clinicalForms.demographInfo = patient ;
        const patientsHistorys = await knex('patientsHistorys').where('clinicalFormID' , id).first() ;
        clinicalForms.patientsHistorys = patientsHistorys ;
        const complentDetail = await knex('complentsDetails').where('clinicalFormID',id).first() ;
        if (complentDetail !== undefined) {
            const lmsqa = await knex('lmsqas').where('complentdetailID',complentDetail.id).first() ;
            complentDetail.lmsqa = lmsqa ;
            const CompanionComplent = await knex('companionsComplents').where('complentdetailID',complentDetail.id);
            complentDetail.CompanionComplent = CompanionComplent ;
        }
        clinicalForms.complentDetail = complentDetail ;
        const PastMedicalHistory = await knex('pastMedicalHistorys').where('clinicalFormID',id).first() ;
        if (PastMedicalHistory !== undefined) {
                const internal_diseases_and_genetic_disorders = await knex('internal_diseases_and_genetic_disorders')
                .where('pastmedicalID' , PastMedicalHistory.id).first() ;
            PastMedicalHistory.internal_diseases_and_genetic_disorders = internal_diseases_and_genetic_disorders ;
            const sergonsHistorys = await knex('sergonsHistorys')
                .where('pastmedicalID' , PastMedicalHistory.id).first() ;
            PastMedicalHistory.sergonsHistorys = sergonsHistorys ;
        }
        clinicalForms.PastMedicalHistory = PastMedicalHistory ;
        const othersystem = await knex('otherSystems').where('clinicalFormID',id).first() ;
        if(othersystem !== undefined){
            const head = await knex('heads').where('otherID' , othersystem.id).first();
            othersystem.head = head;
            const  neck = await knex('necks').where('otherID' , othersystem.id).first();
            othersystem.neck = neck;
            const  chest = await knex('chests').where('otherID' , othersystem.id).first();
            if(chest.id !== undefined){
                const  slipOfBreath = await knex('slipOfBreaths').where('chestID' , chest.id).first();
                chest.slipOfBreath = slipOfBreath;
            }
            othersystem.chest = chest;
            const  AbdomenArea = await knex('abdomenAreas').where('otherID' , othersystem.id).first();
            if (AbdomenArea !== undefined){
                const  nausea = await knex('nauseas').where('abdomenAreaID' , AbdomenArea.id).first();
                AbdomenArea.nausea = nausea;
                const  diarrheal = await knex('diarrheals').where('abdomenAreaID' , AbdomenArea.id).first();
                AbdomenArea.diarrheal = diarrheal;
                const  constipation = await knex('constipations').where('abdomenAreaID' , AbdomenArea.id).first();
                AbdomenArea.constipation = constipation;
            }
            othersystem.AbdomenArea = AbdomenArea;
            const  excretorie = await knex('excretories').where('otherID' , othersystem.id).first();
            othersystem.excretorie = excretorie;
            const  other = await knex('others').where('otherID' , othersystem.id).first();
            othersystem.other = other;
        }
        clinicalForms.othersystem = othersystem;
        const continuousStorie = await knex('continuousStories').where('clinicalFormID' , id).first() ;
        clinicalForms.continuousStorie = continuousStorie ;
        const vitalSigns = await knex('vitalSigns').where('clinicalFormID' , id).first() ;
        clinicalForms.vitalSigns = vitalSigns ;
        const visualExaminations = await knex('visualExaminations').where('clinicalFormID' , id).first() ;
        clinicalForms.visualExaminations = visualExaminations ;
        const headsExaminations = await knex('headsExaminations').where('clinicalFormID' , id).first() ;
        if (headsExaminations !== undefined) {
            const skins = await knex('skins').where('headsExaminationsID' , headsExaminations.id).first() ;
            headsExaminations.skins = skins ;
            const eyes = await knex('eyes').where('headsExaminationsID' , headsExaminations.id).first() ;
            headsExaminations.eyes = eyes ;
            const mouths = await knex('mouths').where('headsExaminationsID' , headsExaminations.id).first() ;
            headsExaminations.mouths = mouths ;
        }
        clinicalForms.headsExaminations = headsExaminations ;
        const necksExaminations = await knex('necksExaminations').where('clinicalFormID' , id).first() ;
        clinicalForms.necksExaminations = necksExaminations ;
        const chestsExaminations = await knex('chestsExaminations').where('clinicalFormID' , id).first() ;
        if (chestsExaminations !== undefined) {
            const visualsChest = await knex('visualsChest').where('chestID' , chestsExaminations.id).first() ;
            chestsExaminations.visualsChest = visualsChest ;
        }
        clinicalForms.chestsExaminations = chestsExaminations ;
        const abdomenExamination = await knex('abdomenExamination').where('clinicalFormID' , id).first() ;
        if (abdomenExamination !== undefined) {
            const visualsAbdomen = await knex('visualsAbdomen').where('abdomenID' , abdomenExamination.id).first() ;
            abdomenExamination.visualsChest = visualsAbdomen ;
            const palpations = await knex('palpations').where('abdomenID' , abdomenExamination.id).first() ;
            abdomenExamination.palpations = palpations ;
            const percussions = await knex('percussions').where('abdomenID' , abdomenExamination.id).first() ;
            abdomenExamination.percussions = percussions ;
        }
        clinicalForms.abdomenExamination = abdomenExamination ;
        const limbs = await knex('limbs').where('clinicalFormID' , id).first() ;
        if (limbs !== undefined) {
            const lowerLimps = await knex('lowerLimps').where('limbsID' , limbs.id).first() ;
            limbs.lowerLimps = lowerLimps ;
            const articulationsUnguis = await knex('articulationsUnguis').where('limbsID' , limbs.id).first() ;
            limbs.articulationsUnguis = articulationsUnguis ;
            const manus = await knex('manus').where('limbsID' , limbs.id).first() ;
            limbs.manus = manus ;
        }
        clinicalForms.limbs = limbs ;

        const examination = await knex('medicalExaminations').select('askExaminations','response').where('patientID' , patientID);
        examinationPdf.examination = examination;

        const dischargeSummarySheets = await knex('dischargeSummarySheets').where('patientID' , patientID);
        dischargeSummarySheetsPdf.dischargeSummarySheets = dischargeSummarySheets;
        // Initialize a PDF document
        const doc = new PDFDocument();

        // console.log(data) ;

        // Set up file path for the PDF
        const filePath = `public/output_${patientID}.pdf`;
        const writeStream = fs.createWriteStream(filePath);
        doc.pipe(writeStream);
        doc.fontSize(16).text('Patient Information', { align: 'center' });
        doc.moveDown();
        // Add some space

        // console.log(examinationPdf) ;
        Object.keys(clinicalForms).forEach(key => {
            if (clinicalForms[key] !== undefined ) {
                Object.keys(clinicalForms[key]).forEach(keys => {
                    if (clinicalForms[key][keys] instanceof Object) {
                        Object.keys(clinicalForms[key][keys]).forEach(keyss => {
                            doc.fontSize(12).text(`${keyss}: ${clinicalForms[key][keys][keyss]}`);
                        })
                        doc.moveDown(1);
                    } else {
                        doc.fontSize(12).text(`${keys}: ${clinicalForms[key][keys]}`);
                    }
                })
                doc.moveDown(2);
            }
        });
        doc.moveDown(4);

        Object.keys(examinationPdf).forEach(key => {
            if (examinationPdf[key] !== undefined ){
                Object.keys(examinationPdf[key]).forEach(keys => {
                    Object.keys(examinationPdf[key][keys]).forEach(keyss =>{
                        doc.fontSize(12).text(`${keyss}: ${examinationPdf[key][keys][keyss]}`);
                    })
                })
            }
        })
        doc.moveDown(4);

        Object.keys(dischargeSummarySheetsPdf).forEach(key => {
            if (dischargeSummarySheetsPdf[key] !== undefined ){
                Object.keys(dischargeSummarySheetsPdf[key]).forEach(keys => {
                    Object.keys(dischargeSummarySheetsPdf[key][keys]).forEach(keyss =>{
                        doc.fontSize(12).text(`${keyss}: ${dischargeSummarySheetsPdf[key][keys][keyss]}`);
                    })
                    doc.moveDown(1);
                })
                doc.moveDown(2);
            }
        })
        doc.moveDown(4);

        doc.end();
        // doc.save();
        writeStream.on('finish', () => {
            res.download(filePath, `output_${patientID}.pdf`, (err) => {
                if (err) {
                    console.error('Error while sending the file:', err);
                    res.status(500).send('Error generating PDF');
                } else {
                    console.log('PDF file sent successfully');
                }
            });
        });
        // res.status(200).send({status : 200 , file : filePath}) ;
        // res.download(filePath) ;
        writeStream.on('error', (err) => {
            console.error('Error while writing the PDF file:', err);
            res.status(500).send('Error generating PDF');
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server Error');
    }

}