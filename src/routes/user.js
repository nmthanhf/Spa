const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router()
const auth = require('../app/middleware/auth')


router.post('/register', auth, userController.register)
router.get('/login', auth ,userController.login)
module.exports = router;