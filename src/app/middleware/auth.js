const jwt = require('jsonwebtoken')
const User = require('../models/User')

//Xác nhận xem tài khoản đã đăng nhập hay chưa
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        try {
            const user = await User.findOne({ _id: data._id, 'tokens.token': token })
            if (!user) {
                throw new Error()
            }
            req.user = user
            req.token = token
            next()
        } catch (error) {
            res.status(401).send({ error: 'Not authorized to access this resource' })
        }
    } catch (error) {
       //res.redirect('user/login')
    }
}
module.exports = auth
