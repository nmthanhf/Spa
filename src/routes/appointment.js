const express = require('express')
const router = express.Router()
const appointmentController = require('../app/controllers/AppointmentController')
const auth = require('../app/middleware/auth')

// Tất cả lỗi trả về: res.json ({error: '...'})
//appointment/
//Lấy ra appointments là danh sách đã đặt lịch của một nhân viên
router.post('/show/:id/', auth.isUser, appointmentController.show)

//Lấy ra
//treatments là danh sách liệu trình và
//employees là danh sách nhân viên có _id, tên
router.get('/userbooking', auth.isUser, appointmentController.index)

//Đặt lịch
//Vào:
//user: _id, name, phoneNumber
//employee: _id, name
//treatment
//startDate: "YYYY-mm-dd"
//startTime: "hh:mm"
//Ra: một appointment
router.post('/userbooking', auth.isUser, appointmentController.userBooking)

//Lấy ra appontments là danh sách tất cả đặt lịch của một người dùng
router.get('/view', auth.isUser, appointmentController.view)

//Xem chi tiết một lịch đã đặt (appointment) theo id
router.get('/view/detail/:id', auth.isUser, appointmentController.viewDetail)

//Chỉnh sửa lịch đã đặt theo id appointment
router.patch('/:id/edit', auth.isUser, appointmentController.edit)

//Xem danh sách lịch làm việc của một nhân viên
router.get('/employee/view', auth.isEmployee, appointmentController.employeeView)

//Xem chi tiết một lịch đã đặt (appointment) theo id với nhân viên
router.get('employee/view/detail/:id', auth.isEmployee, appointmentController.employeeViewDetail)

//Chỉnh sửa lịch đã đặt theo id appointment
router.patch('/:id/employeeEdit', auth.isEmployee, appointmentController.employeeEdit)

module.exports = router
