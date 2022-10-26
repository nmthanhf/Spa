const express = require('express');
const employeeController = require('../app/controllers/EmployeeController');
const router = express.Router()
const auth = require('../app/middleware/auth')
//Đăng ký
router.post('/register', employeeController.register)
//Đăng nhập
router.post('/login', employeeController.login)
//Xem thông tin tài khoản
router.get('/profile', auth.isEmployee, employeeController.profile)
// Sửa thông tin 
router.patch('/:id/edit', auth.isEmployee, employeeController.edit)
//Đăng xuất
router.post('/logout', auth.isEmployee, employeeController.logout)

module.exports = router
 