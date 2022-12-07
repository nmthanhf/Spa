const express = require('express')
const router = express.Router()
const appointmentController = require('../app/controllers/AppointmentController')
const auth = require('../app/middleware/auth')
//appointment/
//Đưa ra  danh sách tất cả đặt lịch hiện có
router.get('/index', auth.isUser, appointmentController.index)

//Đưa ra danh sách nhân viên và danh sách liệu trình
router.get('/userbooking', auth.isUser, appointmentController.book)

//Người dùng đặt lịch
router.post('/userbooking', auth.isUser, appointmentController.userBooking)

//Xem chi tiết một lịch đã đặt (appointment) theo id
router.get('/view/detail/:id', auth.isUser, appointmentController.viewDetail)

//Chỉnh sửa lịch đã đặt theo id appointment
router.put('/:id/edit', auth.isUser, appointmentController.edit)

//Xem danh sách lịch làm việc của một nhân viên
router.get('/employee/view', auth.isEmployee, appointmentController.employeeView)

//Xem chi tiết một lịch đã đặt (appointment) theo id với nhân viên
router.get('employee/view/detail/:id', auth.isEmployee, appointmentController.employeeViewDetail)

//Chỉnh sửa lịch đã đặt theo id appointment
router.put('/:id/employeeEdit', auth.isEmployee, appointmentController.employeeEdit)

//Xoá một lich đã đặt
router.delete('/:id/delete', auth.isEmployee, appointmentController.delete)

module.exports = router
