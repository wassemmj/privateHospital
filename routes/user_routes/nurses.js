const express = require('express') ;
const router = express.Router() ;

const nurseController = require('../../controller/user_controller/nurse_controller');

router.get('/' , nurseController.getAllNurse) ;
router.post('/' , nurseController.createNurse) ;

router.delete('/:id' , nurseController.deleteNurse) ; // id of nurse
router.put('/:id' , nurseController.editNurse) ; // dif of nurse

module.exports = router ;