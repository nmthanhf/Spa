const express = require('express')
const router = express.Router()
const appointmentController = require('../app/controllers/AppointmentController')
const auth = require('../app/middleware/auth')

//Trả về danh sách đã đặt lịch của một nhân viên
router.get('/userbooking/:id/', auth.isUser, appointmentController.show)
//Đưa ra liệu trình, tên và id nhân viên
router.get('/userbooking', auth.isUser, appointmentController.index)
//Đặt lịch
router.post('/userbooking', auth.isUser, appointmentController.userBooking)

module.exports = router