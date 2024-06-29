const knex = require('../../db');

module.exports.getClinicalForms = async (req , res) => {
    const clinicalForms = {} ;
    const id = req.params.id ;
    const patientID = req.params.patientID ;
    try {
        const patient = await knex('patients').select().where('id' , patientID).first() ;
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
        res.status(200).send({'clinical form' : clinicalForms}) ;
    } catch (e) {
        res.status(404).send({'message' : e.message}) ;
    }
}