// required libraries
const express = require('express');

const router = express.Router();
const tasksAPI = require('../../../controllers/api/task_api');

router.get('/',tasksAPI.index);

module.exports = router;