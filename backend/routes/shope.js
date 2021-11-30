const express = require('express') ;
const shopeController = require('../controllers/shopeController')
const router = express.Router() ;

router.route('/shope').get(shopeController.getAllShopes) 
            .post(shopeController.createShope) ;

module.exports = router ;