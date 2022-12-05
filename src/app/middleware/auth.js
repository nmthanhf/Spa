const jwt = require('jsonwebtoken')
const User = require('../models/User')
//Xác nhận xem tài khoản đã đăng nhập hay chưa

module.exports = {
    isUser: async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, process.env.secret)
            try {
                const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    
                if (!user || user.role.localeCompare("user") != 0) {
                    throw new Error()
                }
                req.user = user
                req.token = token
                next()

            } catch (error) {
                res.status(401).send({ error: 'Bạn không được phép truy cập vào trang này' })
            }
        } catch (error) {
            //res.json('/Quay lại trang đăng nhập')
            res.redirect('/login')
        }
    },
    isEmployee: async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, process.env.secret)
            try {
                const user = await User.findOne({ _id: data._id, 'tokens.token': token })
    
                if (!user || user.role.localeCompare("employee") != 0) {
                    throw new Error()
                }
                req.user = user
                req.token = token
                next()
            } catch (error) {
                res.status(401).send({ error: 'Bạn không được phép truy cập vào trang này' })
            }
        } catch (error) {
            //res.json('/Quay lại trang đăng nhập')
            res.redirect('/login')
        }
    },
    isAdmin: async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, process.env.secret)
            try {
                const user = await User.findOne({ _id: data._id, 'tokens.token': token })
                console.log(user)
                if (!user || user.role.localeCompare("admin") != 0) {
                    throw new Error()
                }
                req.user = user
                req.token = token
                next()
                
            } catch (error) {
                //console.log(error)
                res.status(401).send({ error: 'Bạn không được phép truy cập vào trang này' })
            }
        } catch (error) {
            //res.json('/Quay lại trang đăng nhập')
            res.redirect('/login')
        }
    }
}
