const express = require('express');
const ProductController = require('../app/controllers/ProductController');
const router = express.Router()



//Tìm kiếm sản phẩm theo tên
router.get('/search/:text', ProductController.search)

//Chi tết sản phẩm theo id
router.get('/:id', ProductController.getProductById) 

//Lấy ra tất cả sản phẩm
router.get('/', ProductController.getProducts) 
module.exports = router
