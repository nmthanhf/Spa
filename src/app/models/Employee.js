const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

//Tên, địa chỉ bắt buộc
//sdt, email duy nhất
const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "employee"
    },
    salary: {
        type: Number,
        default: 10000000
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

employeeSchema.pre('save', async function (next) {
    const Employee = this
    if (Employee.isModified('password')) {
        Employee.password = await bcrypt.hash(Employee.password, 8)
    }
    next()
})

const Employee = mongoose.model('Employee', employeeSchema)
 
module.exports = Employee
