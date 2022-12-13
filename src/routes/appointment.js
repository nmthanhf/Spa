const express = require('express')
const verify = require('../app/middleware/verify')
const router = express.Router()
const appointmentController = require('../app/controllers/AppointmentController')
const auth = require('../app/middleware/auth')
//appointment/
//Đưa ra  danh sách tất cả đặt lịch hiện có
router.get('/index', auth.isUser, verify.ok, appointmentController.index)

//Đưa ra danh sách nhân viên và danh sách liệu trình
router.get('/userbooking', auth.isUser, verify.ok, appointmentController.book)

//Người dùng đặt lịch
router.post('/userbooking', auth.isUser, verify.ok, appointmentController.userBooking)

//Xem chi tiết một lịch đã đặt (appointment) theo id
router.get('/view/detail/:id', appointmentController.viewDetail)

//Khách hàng tự xem tất cả lịch đã đặt của mình
router.get('/view', auth.isUser, appointmentController.view)

//Chỉnh sửa lịch đã đặt theo id appointment
router.put('/:id/edit', auth.isUser, verify.ok, appointmentController.edit)

//Xem danh sách lịch làm việc của một nhân viên
router.get('/employee/view', auth.isEmployee, appointmentController.employeeView)

//Chỉnh sửa lịch đã đặt theo id appointment
router.put('/:id/employeeEdit', auth.isEmployee, appointmentController.employeeEdit)

//Xoá một lich đã đặt
router.delete('/:id/delete', auth.isEmployee, appointmentController.delete)

//Nhân viên đặt cho khách hàng dựa vào email

module.exports = router
