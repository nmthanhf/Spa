const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('../config/nodemailer')

class UserController {
    //Đăng ký, nhận thông tin tài khoản và trả về user và token
    //POST /employee/register
    async register(req, res, next) {
        try {
            const user = new User(req.body)
            user.role = 'employee'
            await user.save()
            const token = jwt.sign({ _id: user._id }, process.env.secret)
            user.tokens = user.tokens.concat({ token })
            user.confirmationCode = Math.floor(Math.random() * (999999 - 100000)) + 100000
            await sendMail(user.email, user.confirmationCode)
            await user.save()
            res.send({user})
            //res.status(201).redirect('/verify')
        } catch (error) {
            console.log(error)
            res.json({ error: 'Thông tin đã nhập không chính xác' })
        }
    }
}

module.exports = new UserController