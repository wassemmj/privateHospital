const express = require('express') ;
const router = express.Router() ;

const nurseController = require('../../controller/user_controller/nurse_controller');

const recepAuth = require('../../middleware/nonMedical_middleware') ;

router.get('/' , nurseController.getAllNurse) ;
router.post('/' , recepAuth, nurseController.createNurse) ;

router.delete('/:id' , recepAuth, nurseController.deleteNurse) ; // id of nurse
router.put('/:id' , recepAuth, nurseController.editNurse) ; // dif of nurse

module.exports = router ;