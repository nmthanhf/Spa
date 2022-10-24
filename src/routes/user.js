const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router()
const auth = require('../app/middleware/auth')


router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/profile', auth , userController.profile)
router.post('/logout', auth, userController.logout)
module.exports = router;