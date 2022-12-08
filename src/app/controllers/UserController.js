const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('../config/nodemailer')

class UserController {
    //Đăng ký, nhận thông tin tài khoản và trả về user và token
    //POST /user/register
    async register(req, res, next) {
        try {
            const user = new User(req.body)
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

    async verifyCode(req, res, next) {
        if (req.params.confirmationCode == req.user.confirmationCode) {
            await User.updateOne({ _id: req.user._id, }, { $set: { isVerify: 'true' } })
            res.json({message: 'Nhập conde thành công'})
            //res.redirect('/home')
        } else {
            res.json({
                message: 'Mã xác nhân không chính xác'
            })
        }
    }



    //Đăng nhập,  trả về user và token
    //POST /user/login
    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ error: 'Không tìm thấy người dùng' })
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                res.status(400).json({ error: 'Mật khẩu không chính xác' })
            }
            const token = jwt.sign({ _id: user._id }, process.env.secret)
            user.tokens = user.tokens.concat({ token })
            if (user.role.localeCompare("user")) {
                if (user.isVerify == false) {
                    await sendMail(user.email, user.confirmationCode)
                    return res.json({
                        message: 'Tài khoản chưa được xác nhận, mời kiểm tra email'
                    })
                    //return res.redirect('/verify')
                }
            }
            await user.save()
            res.send({ user, token })
        } catch (error) {
            console.log(error)
            res.json({ error: 'Thông tin đã nhập không chính xác' })
        }
    }

    //Xem thông tin
    // GET user/profile
    async profile(req, res, next) {
        res.send(req.user)
    }

    //Sửa thông tin  nhận vào id người dùng 
    //Put /user/edit
    async edit(req, res, next) {
        const _id = req.user._id
        try {
            await User.updateOne({ _id: _id }, req.body)
            const user = await User.findOne({_id: _id})
            res.send({user})
        } catch (error) {
            console.log(error)
            res.json({ error: 'Cập nhật không thành công thông tin người dùng' })
        }
    }

    //Đăng xuất
    //POST /user/logout
    async logout(req, res, next) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.redirect('/login')
        } catch (error) {
            res.json({ error: 'Lỗi đăng xuất' })
        }
    }
}

module.exports = new UserController
