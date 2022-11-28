const express = require('express');
const router = express.Router()
const auth = require('../app/middleware/auth')
const multer = require('../config/multe')
const AdminController = require('../app/controllers/AdminController')
const CommonController = require('../app/controllers/CommonController')
//Tạo sản phẩm mới
router.post('/createProduct', auth.isAdmin, multer.upload.single('img'), AdminController.createProduct)

// //Xoá sản phẩm
router.post('/deleteProduct/:id', auth.isAdmin, AdminController.deleteProduct)

// //Lấy ra thông tin một sản phẩm
router.get(':id', CommonController.getProduct)


// //Lấy ra danh sách sản phẩm
router.get('/', CommonController.getProducts)

module.exports = router
