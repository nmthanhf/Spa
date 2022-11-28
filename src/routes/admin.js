const express = require('express');
const AdminController = require('../app/controllers/AdminController');
const router = express.Router()
const auth = require('../app/middleware/auth')
// ..../admin/..
//Làm mới tiền hoa hồng hàng tháng, đặt lại giá trị là 0
router.post('/refeshCommission', auth.isAdmin, AdminController.refeshCommission)


//Đưa ra danh sách đặt lịch
// Đã hoàn thành: done = true
// Đã thanh toán paid = true
router.post('/appointment/:done&:paid', auth.isAdmin, AdminController.viewAppointment)

router.post('/payroll', auth.isAdmin, AdminController.viewPayroll)
module.exports = router
