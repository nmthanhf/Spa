const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    //Đăng ký, nhận thông tin tài khoản và trả về user và token
    //POST /user/register
    async register(req, res, next) {
        try {
            const user = new User(req.body)
            await user.save()
            const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
            user.tokens = user.tokens.concat({ token })
            await user.save()
            res.status(201).send({ user, token })
        } catch (error) {
            res.json({error: error})
        }
    }
    //Đăng nhập,  trả về user và token
    //POST /user/login
    async login(req, res, next) {
        try {
            const { phoneNumber, password } = req.body
            const user = await User.findOne({ phoneNumber })
            if (!user) {
                res.status(400).json({ error: 'User not found' })
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                res.status(400).json({ error: 'Incorrect password' })
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
            user.tokens = user.tokens.concat({ token })
            await user.save()
            res.send({ user, token })
        } catch (error) {
            res.json({error: error})
        }
    }
    //Xem thông tin
    // GET user/profile
    async profile(req, res, next) {
            res.send(req.user)
    }

    //Sửa thông tin  nhận vào id người dùng 
    //Patch /user/:id/edit
    async edit(req, res, next) {
        const _id = req.params.id
        try {
            await User.updateOne({ _id: _id }, req.body)
            const user = await User.findOne(_id)
            res.send(user)
        } catch (error) {
            res.json({error: error})
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
            res.redirect('/')
        } catch (error) {
            res.json({error: error})
        }
    }
}

module.exports = new UserController
