
const Product = require('../models/Product')
const Treatment = require('../models/Treatment')
const Appointment = require('../models/Appointment')
const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const Order = require('../models/Order')
const { Buffer } = require('buffer')
const { errorMonitor } = require('events')
const ProductController = require('./ProductController')
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
                amount: req.body.amount,
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
            return res.send({ product })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async deleteProduct(req, res, next) {
        try {
            await Product.deleteOne({ _id: req.params.id })
        } catch (error) {
            return res.json({ message: 'Xo?? s???n ph???m kh??ng th??nh c??ng' })
        }
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
            return res.send({ treatment })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }

    async deleteTreatment(req, res, next) {
        try {
            await Treatment.deleteOne({ _id: req.params.id })
            return res.json({ message: 'Xo?? li???u tr??nh th??nh c??ng' })
        } catch (error) {
            return res.json({ message: 'Xo?? li???u tr??nh kh??ng th??nh c??ng' })
        }

    }

    async viewAllAppointment(req, res, next) {
        try {
            const appointments = await Appointment.find({})
            return res.send({ appointments })
        } catch (error) {
            return res.json({ error: "L???i l???i r T.T" })
        }
    }

    async viewPayroll(req, res, next) {
        try {
            const employees = await User.find({ role: 'employee' }, 'name salary payroll')
            return res.send({ employees })
        } catch (error) {
            console.log(error)
            return res.json({ error: "L???i l???i r T.T" })
        }
    }

    async show(req, res, next) {
        try {
            const users = await User.find({ role: 'user' })
            const employees = await User.find({ role: 'employee' })
            return res.send({ users, employees })
        } catch (error) {
            return res.json({ error: "L???i l???i r T.T" })
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
            return res.send({ user })
        } catch (error) {
            console.log(error)
            return res.json({ message: error.message })
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
            return res.send({ user })
        } catch (error) {
            console.log(error)
            return res.json({ message: error.message })
        }
    }

    async editAccount(req, res, next) {
        const _id = req.params.id
        try {
            await User.updateOne({ _id: _id }, req.body)
            const user = await User.findOne({ _id: _id })
            return res.send({ user })
        } catch (error) {
            console.log(error)
            return res.json({ error: 'C???p nh???t kh??ng th??nh c??ng th??ng tin ng?????i d??ng' })
        }
    }

    async deleteAccount(req, res, next) {
        try {
            await User.deleteOne({ email: req.body.email })
            return res.status(200).json({ message: 'Xo?? th??ng tin th??nh c??ng' })
        } catch (error) {
            return res.json({ error: 'Xo?? th??ng tin kh??ng th??nh c??ng' })
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
            //T??nh th???i gian b???t ?????u v?? k???t th??c
            //L??u trong d??? li???u vd:"2022-12-12T04:50:00.329Z"
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

            //L???y ra th??ng tin kh??ch h??ng kh??ch h??ng
            const user = await User.findOne({ email: req.body.email })
            req.body.Customer = user.name

            //Check xem l???ch c?? b??? tr??ng khi ?????t c??ng m???t nh??n vi??n hay kh??ng
            var count = await Appointment.find({ technician_id: req.technician_id, StartTime: { $gte: StartTime, $lt: EndTime } }).count()
            if (count == 0) {
                count = await Appointment.find({ technician_id: req.technician_id, EndTime: { $gte: StartTime, $lt: EndTime } }).count()
            }
            if (count != 0) {
                return res.status(400).json({ error: 'Nh??n vi??n ??ang b???n trong kho???ng th???i gian n??y, m???i ?????t l???ch v??o th???i gian kh??c ho???c v???i nh??n vi??n kh??c' })
            }
            const appointment = new Appointment(req.body)
            appointment.save()
            return res.send({ appointment })
        } catch (error) {
            console.log(error)
            return res.json({ message: error.message })
        }

    }


    async finishAppointment(req, res, next) {
        const _id = req.params.id
        try {
            const appointment = await Appointment.findById(_id)
            if (appointment.Status.localeCompare('??ang x??? l??') == 0) {
                await Appointment.updateOne({ _id: _id }, { $set: { Status: '???? ho??n th??nh' } })
                const treatment = await Treatment.findById(appointment.Treatment_id)
                const val = (treatment.bonus) / 100 * treatment.newPrice
                await User.updateOne({ _id: appointment.Technician_id }, { $inc: { payroll: val } })
                const employee = await User.findById(appointment.Technician_id)
                return res.status(200).json({ message: '???? ho??n th??nh l???ch v???a ch???n' })
            } else {
                return res.json({ message: '?????t l???ch ???? ???????c ????nh d???u ho??n th??nh tr?????c ????' })
            }
        } catch (error) {
            return res.json({ message: error.message })
        }
    }

    async order(req, res, next) {
        try {
            const products = req.body.products
            let order, subtotal
            for (var i = 0; i < products.length; i++) {
                let product = await Product.findById(products[i].productId)
                let item = {
                    productId: product._id,
                    amount: parseInt(products[i].amount),
                    newPrice: product.newPrice,
                    subtotal: parseInt(parseInt(products[i].amount) * product.newPrice)
                }
                if (i == 0) {
                    order = new Order({ items: item, total: subtotal })
                } else if (i > 0) {
                    console.log(item)
                    order.items.push(item)
                    order.total = order.items.map(item => item.subtotal).reduce((acc, next) => acc + next);
                }
                ProductController.updateAmout(product._id, parseInt(products[i].amount))
            }
            order.email = req.body.email


            order.save()
            return res.json({ order })
        } catch (error) {
            console.log(error)
            return res.json({ message: error.message })
        }
    }


    async updateProduct(req, res, next) {
        const id = req.params.id
        try {
            await Product.updateOne({_id: id}, req.body)
            const product = await Product.findById(id)
            return res.send({product})
        } catch (error) {
            console.log(error)
            return res.json({message: 'C???p nh???t th??ng tin s???n ph???m kh??ng th??nh c??ng'})
        }
    }

    async updateTreatment(req, res, next) {
        const id = req.params.id
        try {
            await Treatment.updateOne({_id: id}, req.body)
            const treatment = await Treatment.findById(id)
            return res.send({treatment})
        } catch (error) {
            console.log(error)
            return res.json({message: 'C???p nh???t th??ng tin li???u tr??nh kh??ng th??nh c??ng'})
        }
    }


    async updateAppointment(req, res, next) {
        const _id = req.params.id
        try {
            await Appointment.updateOne({ _id: _id }, req.body)
            const appointment = await Appointment.findById(_id)
            return res.send(appointment)
        } catch (error) {
            return res.json({ error: 'C???p nh???t th??ng tin l???ch h???n kh??ng th??nh c??ng' })
        }
    }

    async deleteAppointment(req, res, next) {
        try {
        await Appointment.deleteOne({ _id: req.params.id })
        return res.json({message: 'Xo?? ?????t l???ch th??nh c??ng'})
        } catch (error) {
            console.log(error)
            return res.json({message: 'Xo?? ?????t l???ch th???t b???i'})
        }
    }
}

module.exports = new AdminController