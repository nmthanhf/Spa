const express = require('express');
const accountController = require('../app/controllers/AccountController');
const router = express.Router()


router.post('/register', accountController.register)
router.post('/login', accountController.login)
router.get('/profile', accountController.profile)
router.post('/logout', accountController.logout)

module.exports = router;