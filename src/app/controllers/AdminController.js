
const Product = require('../models/Product')
const Treatment = require('../models/Treatment')
const Appointment = require('../models/Appointment')
const mongoose = require('mongoose')
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
                extraImage1: { id: new mongoose.Types.ObjectId(),src: extraImage1src },
                extraImage2: {id: new mongoose.Types.ObjectId(),src: extraImage2src},
                extraImage3: {id: new mongoose.Types.ObjectId(),src: extraImage3src},
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
            let mainImagesrc, extraImage1src ="", extraImage2src="", extraImage3src=""
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
                mainImage: {id: new mongoose.Types.ObjectId(), src: mainImagesrc },
                extraImage1: { id: new mongoose.Types.ObjectId(),src: extraImage1src },
                extraImage2: {id: new mongoose.Types.ObjectId(),src: extraImage2src},
                extraImage3: {id: new mongoose.Types.ObjectId(),src: extraImage3src},
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
            const employees = await User.find({ role: 'employee' }, 'name phoneNumber salary payroll')
            res.send({ employees })
        } catch (error) {
            res.json({ error: error })
        }
    }
}

module.exports = new AdminController