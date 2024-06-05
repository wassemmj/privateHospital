const express = require('express') ;
const router = express.Router() ;

const userController = require('../../controller/user_controller/user_controller');

router.post('/login' , userController.login) ;

module.exports = router ;