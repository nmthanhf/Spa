const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const sendMail = require('../config/nodemailer')
//Tên, địa chỉ bắt buộc
//sdt, email duy nhất
const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Địa chỉ email là bắt buộc'],
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Địa chỉ email không chính xác' })
            }
        }
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String,
    },
    address: {
        type: String
    },
    role: {
        type: String,
        default: "user"
    },
    salary: {
        type: Number,
        default: 10000000
    },
    payroll: {
        type: Number,
        default: 0
    },
    isVerify: {
        type: Boolean,
        default: false
    },
    confirmationCode: {
        type: Number
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true,
})

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
