const Account = require('../models/Account')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { mongooseToObject } = require('../../util/mongoose')
const SECRET = "T.T"

class AccountController {
    async login(req, res) {
        try {
            const account = await Account.findOne({ email: req.body.email })
            if (account) {
                const result = await bcrypt.compare(req.body.password, account.password)
                if (result) {
                    const token = await jwt.sign({ email: account.email }, SECRET)
                    user_id = account._id
                    res.send({account})
                } else {
                    res.send({ error: "Mật khẩu sai" })
                }
            } else {
                res.send({ error: "Tài khoản chưa được đăng ký" })
            }
        } catch (error) {
            res.send(error)
        }
    }

    async register(req, res) {
        try {
            const account = await Account.findOne({ email: req.body.email })
            if (account) {
                res.json({error:  "Tài khoản đã tồn tại"})
            } else {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const account = await Account.create(req.body);
            res.send({account})
            }
        } catch (error) {
            res.send({ error });
        }
    }

    profile(req, res, next) {
        if (user_id != null) {
            try {
                Account.findById(user_id).
                    then(account => {
                        res.json(account)
                    })
            } catch (error) {
                console.log(error)
                res.redirect('account/login') 
            }
        } else {
            res.redirect('/account/login')
        }
    }

    logout(req, res, next) {
        user_id = null
        res.redirect('/home')
    }

}

module.exports = new AccountController
