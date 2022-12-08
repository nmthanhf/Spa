const express = require('express');
const CartController = require('../app/controllers/CartController');
const productController = require('../app/controllers/ProductController');
const auth = require('../app/middleware/auth')
const verify = require('../app/middleware/verify')
const router = express.Router()

router.post('/addtocart', auth.isUser, verify.ok, CartController.addItemToCart)
module.exports = router