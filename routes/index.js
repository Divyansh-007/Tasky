// required libraries
const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('Main Express Router Loaded');

// home page
router.get('/',homeController.home);

// user page routing
router.use('/user',require('./user'));

// task page routing
router.use('/task',require('./task'));

// password routing
router.use('/password',require('./password'));

// api routing
router.use('/api',require('./api/index'));

module.exports = router;

