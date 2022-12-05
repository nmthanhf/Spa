//Xem tài khoản đã xác nhận hay chưa

module.exports = {
    async (req, res, next) {
         if (req.user.isVerify == true) {
            next()
         } else {
            res.json("Tài khoản chưa xác nhận, mời kiểm tra email")
            //await sendMail(user.email, user.confirmationCode)
            //res.redirect('/verify')
         }
    }
}
