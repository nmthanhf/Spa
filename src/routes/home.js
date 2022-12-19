const express = require('express');
const ProdcutController = require('../app/controllers/ProductController')
const auth = require('../app/middleware/auth')
const verify = require('../app/middleware/verify');
const router = express.Router()

router.get('/', ProdcutController.getProducts)
module.exports = router