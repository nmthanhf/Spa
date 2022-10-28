const Employee = require('../models/Employee')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class EmployeeController {
    //Đăng ký
    async register(req, res, next) {
        try {
            const employee = new Employee(req.body)
            await employee.save()
            const token = jwt.sign({ _id: employee._id }, process.env.JWT_KEY)
            employee.tokens = employee.tokens.concat({ token })
            await employee.save()
            res.send({ employee: employee, token })
        } catch (error) {
            //console.log(error)
            res.send(error)
        }
    }
    //Đăng nhập
    async login(req, res, next) {
        try {
            const { phoneNumber, password } = req.body
            const employee = await Employee.findOne({ phoneNumber })
            if (!employee) {
                throw new Error({ error: 'Employee not found' })
            }
            const isPasswordMatch = await bcrypt.compare(password, employee.password)
            if (!isPasswordMatch) {
                throw new Error({ error: 'Incorrect password' })
            }
            const token = jwt.sign({ _id: employee._id }, process.env.JWT_KEY)
            employee.tokens = employee.tokens.concat({ token })
            await employee.save()
            res.send({ employee: employee, token })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
    //Xem thông tin
    //
    async profile(req, res, next) {
        try {
            res.send(req.employee)
        } catch (error) {
            console.log(error)
        }
    }

    //Sửa thông tin
    async edit(req, res, next) {
        const _id = req.params.id
        try {
            await Employee.updateOne({ _id: _id }, req.body)
            const employee = await Employee.findById(_id)
            res.send(employee)
        } catch (error) {
            res.send(error)
        }
    }

    //Đăng xuất
    async logout(req, res, next) {
        try {
            req.employee.tokens = req.employee.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.employee.save()
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }
}
 
module.exports = new EmployeeController