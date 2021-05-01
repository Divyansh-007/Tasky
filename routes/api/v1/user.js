// required libraries
const express = require('express');
const passport = require('passport');

const router = express.Router();
const userAPI = require('../../../controllers/api/user_api');

router.post('/create-session',userAPI.createSession);
router.get('/home',passport.authenticate(
    'jwt',
    {session: false}
),userAPI.home);

module.exports = router;