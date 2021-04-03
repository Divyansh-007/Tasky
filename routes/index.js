// required libraries
const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Main Express Router Loaded');

// home page
router.get('/',homeController.home);

// user page routing
router.use('/user',require('./user'));

module.exports = router;

