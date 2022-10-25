const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router()
const auth = require('../app/middleware/auth')

//Đăng ký
router.post('/register', userController.register)
//Đăng nhập
router.post('/login', userController.login)
//Xem thông tin tài khoản
router.get('/profile', auth, userController.profile)
// Sửa thông tin 
// router.put('/:id/edit', auth, userController.edit)
//Đăng xuất
router.post('/logout', auth, userController.logout)

module.exports = router
