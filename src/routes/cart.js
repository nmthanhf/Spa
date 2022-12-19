const express = require('express');
const CartController = require('../app/controllers/CartController');
const auth = require('../app/middleware/auth')
const verify = require('../app/middleware/verify');
const router = express.Router()

router.post('/addtocart', auth.isUser, verify.ok, CartController.addItemToCart)

router.post('/', auth.isUser, verify.ok, CartController.view) 
module.exports = router