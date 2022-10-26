const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {
    //Đăng ký
    async register(req, res, next) {
        try {
            const user = new User(req.body)
            await user.save()
            const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
            user.tokens = user.tokens.concat({ token })
            await user.save()
            res.status(201).send({ user, token })
        } catch (error) {
            //console.log(error)
            res.send(error)
        }
    }
    //Đăng nhập
    async login(req, res, next) {
        try {
            const { phoneNumber, password } = req.body
            const user = await User.findOne({ phoneNumber })
            if (!user) {
                throw new Error({ error: 'User not found' })
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                throw new Error({ error: 'Incorrect password' })
            }
            const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
            user.tokens = user.tokens.concat({ token })
            await user.save()
            res.send({ user, token })
        } catch (error) {
            res.send(error)
        }
    }
    //Xem thông tin
    async profile(req, res, next) {
            res.send(req.user)
    }

    //Sửa thông tin
    async edit(req, res, next) {
        const _id = req.params.id
        try {
            await User.updateOne({ _id: _id }, req.body)
            const user = await User.findOne(_id)
            res.send(user)
        } catch (error) {
            res.send(error)
        }
    }
 
    //Đăng xuất
    async logout(req, res, next) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = new UserController
