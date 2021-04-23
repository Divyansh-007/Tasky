// required libraries
const express = require('express');

const router = express.Router();
const passController = require('../controllers/password_controller');

console.log('Password Express Router Loaded');

router.get('/forget',passController.forget); 
router.post('/generate-new',passController.generateNew);
router.get('/reset/:token',passController.reset);
router.post('/update/:token',passController.update);

module.exports = router;