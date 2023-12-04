const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/login', authController.login);

router.get('/google', authController.googleLogin);
router.get('/google/callback', authController.googleCallback);

router.get('/facebook', authController.facebookLogin);
router.get('/facebook/callback', authController.facebookCallback);

module.exports = router;
