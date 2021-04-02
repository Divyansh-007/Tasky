// required libraries
const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

// home page
router.get('/',homeController.home);

console.log('Main Express Router Loaded');

module.exports = router;

