// required libraries
const express = require('express');
const passport = require('passport');

const router = express.Router();
const taskController = require('../controllers/task_controller');

console.log('Task Express Router Loaded');

router.post('/createTask',passport.checkAuthenticatedUser,taskController.create);
router.get('/complete-task/:id',passport.checkAuthenticatedUser,taskController.complete);
router.get('/delete-tasks',passport.checkAuthenticatedUser,taskController.destroy);

module.exports = router;