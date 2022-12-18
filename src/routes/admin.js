const express = require('express');
const multer = require('../app/config/multe')
const AdminController = require('../app/controllers/AdminController')
const auth = require ('../app/middleware/auth')
const router = express.Router()

router.post('/addProduct', auth.isAdmin ,multer.upload.array('files', 4), AdminController.createProduct)
router.post('/addTreatment',  auth.isAdmin, multer.upload.array('files', 4), AdminController.createTreatment)

router.post('/updateProduct/:id', auth.isAdmin ,multer.upload.array('files', 4), AdminController.updateProduct)
router.post('/updateTreatment/:id',  auth.isAdmin, multer.upload.array('files', 4), AdminController.updateTreatment)

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
router.post('/deleteAccount', auth.isAdmin, AdminController.deleteAccount)

//Đặt lịch cho người dùng theo email
router.post('/addAppointment', auth.isAdmin, AdminController.addAppointment)

//Đánh dấu đặt lịch đẫ hoàn thành và thêm hoa hồng cho nhân viên
router.post('/finishAppointment/:id', auth.isAdmin, AdminController.finishAppointment)

//Sửa thông tin nv, kh
router.put('/editAccount/:id', auth.isAdmin, AdminController.editAccount)

//tạo đơn hàng
//Nhận vào một ds sản phẩm
router.post('/order', auth.isAdmin, AdminController.order)

//--báo cáo---

module.exports = router
