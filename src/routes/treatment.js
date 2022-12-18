const express = require('express');
const TreatmentController = require('../app/controllers/TreatmentController');
const router = express.Router()



//Tìm kiếm sản phẩm theo tên
router.get('/search/:text', TreatmentController.search)

//Chi tết sản phẩm theo id
router.get('/:id', TreatmentController.getTreatmentById) 

//Lấy ra tất cả sản phẩm
router.get('/', TreatmentController.getTreatments) 

module.exports = router
