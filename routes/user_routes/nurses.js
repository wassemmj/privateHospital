const express = require('express') ;
const router = express.Router() ;

const nurseController = require('../../controller/user_controller/nurse_controller');

router.get('/' , nurseController.getAllNurse) ;
router.post('/' , nurseController.createNurse) ;

module.exports = router ;