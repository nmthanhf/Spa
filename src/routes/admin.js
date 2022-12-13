const express = require('express');
const multer = require('../app/config/multe')
const AdminController = require('../app/controllers/AdminController')
const auth = require ('../app/middleware/auth')
const router = express.Router()

router.post('/addProduct', auth.isAdmin ,multer.upload.array('files', 4), AdminController.createProduct)
router.post('/addTreatment',  auth.isAdmin, multer.upload.array('files', 4), AdminController.createTreatment)

router.post('/deleteProduct/:id', auth.isAdmin, AdminController.deleteProduct)
router.post('/deleteTreatment/:id', auth.isAdmin, AdminController.deleteTreatment)

router.post('/appointment/', auth.isAdmin, AdminController.viewAllAppointment)

// ten , luong, thuong
router.post('/payroll', auth.isAdmin, AdminController.viewPayroll)

//Xem danh sách nv, kh
router.get ('/view', auth.isAdmin, AdminController.show)

//Thêm kh, Bắt buộc phải có email, mk mặc định 12345678
router.post('/addcustomer', auth.isAdmin, AdminController.addCustomer)

//Thêm nv, Bắt buộc phải có email, mk mặc định 12345678
router.post('/addEmployee', auth.isAdmin, AdminController.addEmployee)

//Xoá tài khoản theo email
router.post('/delete', auth.isAdmin, AdminController.deleteAccount)



//thêm lịch cho kh
//tạo đơn hàng
//--báo cáo---

module.exports = router
