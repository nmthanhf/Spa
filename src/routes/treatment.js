const express = require('express');
const router = express.Router()
const auth = require('../app/middleware/auth')
const multer = require('../config/multe')
const AdminController = require('../app/controllers/AdminController')
const CommonController = require('../app/controllers/CommonController')
//Tạo liệu trình mới
router.post('/createTreatment', auth.isAdmin, multer.upload.single('img'), AdminController.createTreatment)

// Xoáliệu trình
router.post('/deleteTreatment/:id', auth.isAdmin, AdminController.deleteTreatment)

//Lấy ra thông tin một liệu trình
router.get(':id', CommonController.getTreatment)


// Lấy ra danh sáchliệu trình
router.get('/', CommonController.getTreatments)

module.exports = router
