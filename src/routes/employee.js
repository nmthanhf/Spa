const express = require('express');
const router = express.Router()
const auth = require('../app/middleware/auth')
const verify = require('../app/middleware/verify')
const employeeControllor = require('../app/controllers/EmployeeController')
//user/register nhận thông tin tài khoản và trả về user và token

router.post('/register', employeeControllor.register)

module.exports = router
