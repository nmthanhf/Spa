const express = require('express')
const router = express.Router()
const appointmentController = require('../app/controllers/AppointmentController')
const auth = require('../app/middleware/auth')

//Trả về danh sách đã đặt lịch của một nhân viên
router.post('/show/:id/', auth.isUser, appointmentController.show)

//Đưa ra liệu trình, tên và id nhân viên
router.get('/userbooking', auth.isUser, appointmentController.index)

//Đặt lịch
router.post('/userbooking', auth.isUser, appointmentController.userBooking)

//Xem tất cả đặt lịch của một người dùng
router.get('/view', auth.isUser, appointmentController.view)

//Xem chi tiết một lịch đã đặt
router.get('/view/detail/:id', auth.isUser, appointmentController.viewDetail)

//Chỉnh sửa lịch đã đặt
router.patch('/:id/edit', auth.isUser, appointmentController.edit)

module.exports = router
