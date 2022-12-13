
const Product = require('../models/Product')
const Treatment = require('../models/Treatment')
const Appointment = require('../models/Appointment')
const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const { Buffer } = require('buffer')
class AdminController {

    async createProduct(req, res, next) {
        try {
            let mainImagesrc, extraImage1src, extraImage2src, extraImage3src
            for (var i = 0; i < req.files.length; i++) {
                var bitmap = fs.readFileSync(req.files[i].path)
                var src = 'data:' + req.files[i].mimetype + ";base64,"
                src += new Buffer(bitmap).toString('base64')

                if (i == 0) {
                    mainImagesrc = src;
                } else if (i == 1) {
                    extraImage1src = src;
                } else if (i == 2) {
                    extraImage2src = src;
                } else if (i == 3) {
                    extraImage3src = src;
                }
            }
            console.log(mainImagesrc)
            //const _id = new mongoose.Types.ObjectId()
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                oldPrice: req.body.oldPrice,
                newPrice: req.body.newPrice,
                view: req.body.view,
                color: req.body.color,
                amount: req.body.mount,
                rating: req.body.rating,
                category: req.body.category,
                status: req.body.status,
                tags: req.body.tags,
                startDate: req.body.startDate,
                properties: req.body.properties,
                productCode: req.body.productCode,
                description: req.body.description,
                mainImage: { id: new mongoose.Types.ObjectId(), src: mainImagesrc },
                extraImage1: { id: new mongoose.Types.ObjectId(), src: extraImage1src },
                extraImage2: { id: new mongoose.Types.ObjectId(), src: extraImage2src },
                extraImage3: { id: new mongoose.Types.ObjectId(), src: extraImage3src },
            }
            )
            product.save()
            res.send({ product })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: 'Tạo sản phẩm mới không thành công'
            })
        }
    }

    async deleteProduct(req, res, next) {
        await Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }


    async createTreatment(req, res, next) {
        try {
            //console.log(req.files)
            let mainImagesrc, extraImage1src = "", extraImage2src = "", extraImage3src = ""
            for (var i = 0; i < req.files.length; i++) {
                var bitmap = fs.readFileSync(req.files[i].path)
                var src = 'data:' + req.files[i].mimetype + ";base64,"
                src += new Buffer(bitmap).toString('base64')
                src += ""
                if (i == 0) {
                    mainImagesrc = src;
                } else if (i == 1) {
                    extraImage1src = src;
                } else if (i == 2) {
                    extraImage2src = src;
                } else if (i == 3) {
                    extraImage3src = src;
                }
            }
            const treatment = new Treatment({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                oldPrice: req.body.oldPrice,
                newPrice: req.body.newPrice,
                view: req.body.view,
                amount: req.body.mount,
                rating: req.body.rating,
                category: req.body.category,
                status: req.body.status,
                tags: req.body.tags,
                duration: req.body.duration,
                ingredient: req.body.ingredient,
                startDate: req.body.startDate,
                properties: req.body.properties,
                bonus: req.body.bonus,
                branch: req.body.branch,
                description: req.body.description,
                mainImage: { id: new mongoose.Types.ObjectId(), src: mainImagesrc },
                extraImage1: { id: new mongoose.Types.ObjectId(), src: extraImage1src },
                extraImage2: { id: new mongoose.Types.ObjectId(), src: extraImage2src },
                extraImage3: { id: new mongoose.Types.ObjectId(), src: extraImage3src },
            }
            )
            treatment.save()
            res.send({ treatment })
        } catch (error) {
            res.status(500).json({
                error: 'Tạo liệu trình mới không thành công'
            })
        }
    }

    async deleteTreatment(req, res, next) {
        await Treatment.deleteOne({ _id: req.params.id })
            .then(() =>
                res.redirect('back'))
            .catch(next)
    }

    async viewAllAppointment(req, res, next) {
        try {
            const appointments = await Appointment.find({})
            res.send({ appointments })
        } catch (error) {
            res.json({ error: error })
        }
    }

    async viewPayroll(req, res, next) {
        try {
            const employees = await User.find({ role: 'employee' }, 'name salary payroll')
            res.send({ employees })
        } catch (error) {
            console.log(error)
            res.json({ error: error })
        }
    }

    async show(req, res, next) {
        try {
            const users = await User.find({ role: 'user' })
            const employees = await User.find({ role: 'employee' })
            res.send({ users, employees })
        } catch (error) {
            res.json({ error: error })
        }
    }

    async addCustomer(req, res, next) {
        try {
            req.body.isVerify = 'true'
            const user = new User(req.body)
            user.password = '12345678'
            const token = jwt.sign({ _id: user._id }, process.env.secret)
            user.tokens = user.tokens.concat({ token })
            user.confirmationCode = Math.floor(Math.random() * (999999 - 100000)) + 100000
            await user.save()
            res.send({ user })
        } catch (error) {
            console.log(error)
            res.json({ error: 'Chưa thêm được người dùng' })
        }
    }

    async addEmployee(req, res, next) {
        try {
            req.body.isVerify = 'true'
            const user = new User(req.body)
            user.password = '12345678'
            user.role = 'employee'
            const token = jwt.sign({ _id: user._id }, process.env.secret)
            user.tokens = user.tokens.concat({ token })
            user.confirmationCode = Math.floor(Math.random() * (999999 - 100000)) + 100000
            await user.save()
            res.send({ user })
        } catch (error) {
            console.log(error)
            res.json({ error: 'Chưa thêm được nhân viên' })
        }
    }

    async deleteAccount(req, res, next) {
        try {
            await User.deleteOne({ email: req.body.email })
            res.status(200).json({ message: 'Xoá thông tin thành công' })
        } catch (error) {
            res.json({ error: 'Xoá thông tin không thành công' })
        }
    }

    async addAppointment(req, res, next) {
        try {
            const now = new Date()
            const dayOfWeek = Number.parseInt(req.body.dayOfWeek)
            const days = (7 - now.getDay() + dayOfWeek)
            const date = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
                + days
            )
            if (date < new Date()) {
                date.setDate(date.getDate() + 7)
            }
            req.body.date = date
            //Tính thời gian bắt đầu và kết thúc
            //Lưu trong dữ liệu vd:"2022-12-12T04:50:00.329Z"
            var StartTime = String(req.body.StartTime)

            var hours = parseInt(StartTime.slice(0, 2))
            var minutes = parseInt(StartTime.slice(3))
            StartTime = new Date(date.setHours(hours, minutes, 0))
            const treatment = await Treatment.findById(req.body.Treatment_id);
            req.body.treatment = treatment
            var time = Number.parseInt(treatment.duration);

            var EndTime = new Date(StartTime.getTime() + time * 60 * 1000);
            req.body.StartTime = StartTime
            req.body.EndTime = EndTime

            //Lấy ra thông tin khách hàng khách hàng
            const user = await User.findOne({email: req.body.email})
            req.body.Customer = user.name

            //Check xem lịch có bị trùng khi đặt cùng một nhân viên hay không
            var count = await Appointment.find({ technician_id: req.technician_id, StartTime: { $gte: StartTime, $lt: EndTime } }).count()
            if (count == 0) {
                count = await Appointment.find({ technician_id: req.technician_id, EndTime: { $gte: StartTime, $lt: EndTime } }).count()
            }
            if (count != 0) {
                return res.status(400).json({ error: 'Nhân viên đang bận trong khoảng thời gian này, mời đặt lịch vào thời gian khác hoặc với nhân viên khác' })
            }
            const appointment = new Appointment(req.body)
            appointment.save()
            res.send({ appointment })
        } catch (error) {
            console.log(error)
            return res.json({ message: 'Đầu vào không hợp lệ' })
        }

    }

    async order(req, res, next) {
        
    }
}

module.exports = new AdminController