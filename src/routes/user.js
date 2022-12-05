const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router()
const auth = require('../app/middleware/auth')
const verify = require('../app/middleware/verify')
//user/register nhận thông tin tài khoản và trả về user và token
router.post('/register', userController.register)

//Gửi mã xác nhận 
router.post('/verify/:confirmationCode', auth.isUser, userController.verifyCode)

// use/login,  trả về user và token
router.post('/login', userController.login)

// Xem thông tin tài khoản
router.get('/profile', auth.isUser, verify.async, userController.profile)

// Sửa thông tin, nhận vào id người dùng 
router.put('/:id/edit', auth.isUser,verify.async, userController.edit)

//Đăng xuất
router.post('/logout', auth.isUser,verify.async , userController.logout)

module.exports = router
