const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Employee = require('../models/Employee')
//Xác nhận xem tài khoản đã đăng nhập hay chưa

module.exports = {
    isUser: async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, process.env.JWT_KEY)
            console.log(token)
            try {
                const user = await User.findOne({ _id: data._id, 'tokens.token': token })
                if (!user) {
                    throw new Error()
                }
                req.user = user
                req.token = token
                next()
            } catch (error) {
                // res.send(error)
                res.status(401).send({ error: 'Not authorized to access this resource' })
            }
        } catch (error) {
            console.log(error)
            //res.redirect('user/login')
        }
    },
    isEmployee: async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const data = jwt.verify(token, process.env.JWT_KEY)
            try {
                const employee = await Employee.findOne({ _id: data._id, 'tokens.token': token })
                if (!employee) {
                    throw new Error()
                }
                req.employee = employee
                req.token = token
                next()
            } catch (error) {
                res.status(401).send({ error: 'Not authorized to access this resource' })
            }
        } catch (error) {
            console.log(error)
            //res.redirect('Employee/login')
        }
    }
}
