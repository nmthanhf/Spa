const express = require('express');
const router = express.Router()
const auth = require('../app/middleware/auth')
const CartController = require('../app/controllers/CartController')

//..../cart/...
router.get('/', auth.isUser, CartController.index)



module.exports = router
