const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const passport = require('passport');


router.post('/register', userController.register);
router.get('/all',  userController.displayUser);
router.delete('/user/:id',  userController.removeUser);
router.put('/update-user/:id', userController.updateUser);
router.post('/forgot-password', userController.forgotPassword);
module.exports = router;

module.exports = router;
