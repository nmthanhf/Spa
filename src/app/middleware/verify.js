//Xem tài khoản đã xác nhận hay chưa
const sendMail = require('../config/nodemailer')

module.exports = {
    async ok (req, res, next) {
         if (req.user.isVerify == true) {
            next()
         } else {
            await sendMail(req.user.email, req.user.confirmationCode)
            return res.json({message: 'Tài khoản chưa xác nhận, mời kiểm tra email'})  
         }
    }
}
