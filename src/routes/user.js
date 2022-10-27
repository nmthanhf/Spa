const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router()
const auth = require('../app/middleware/auth')
//user/register nhận thông tin tài khoản và trả về user và token
router.post('/register', userController.register)
//use/login,  trả về user và token
router.post('/login', userController.login)
//Xem thông tin tài khoản
router.get('/profile', auth.isUser, userController.profile)
// Sửa thông tin, nhận vào id người dùng 
router.patch('/:id/edit', auth.isUser, userController.edit)
//Đăng xuất
router.post('/logout', auth.isUser, userController.logout)

module.exports = router
 