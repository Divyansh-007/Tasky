// required libraries
const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/user_controller');

console.log('User Express Router Loaded');

router.get('/home',passport.checkAuthenticatedUser,userController.home);
router.get('/profile/:id',passport.checkAuthenticatedUser,userController.profile);
router.post('/update/:id',passport.checkAuthenticatedUser,userController.update);
router.get('/password/update/:id',passport.checkAuthenticatedUser,userController.updPassword);
router.get('/generate-code/:id',userController.generateCode);
router.post('/reset',userController.reset);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/'}
),userController.createSession);
router.get('/sign-out',userController.destroySession);
router.get('/auth/google',passport.authenticate(
    'google',
    {scope: ['profile','email']}
));
router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect: '/'}
),userController.createSession);

module.exports = router;
