const Appointment = require('../models/Appointment');
const Employee = require('../models/Employee')
const Product = require('../models/Product')
const Treatment = require('../models/Treatment')
class AdminController {
    //Làm mới tiền hoa hồng của nhân nhân viên hàng tháng
    async refeshCommission(req, res, next) {
        await Employee.updateMany({}, { $set: { payroll: '0' } });
        res.sendStatus(200)
    }

    async createProduct(req, res, next) {
        try {
            const name = req.body.name
            const des = req.body.des
            const img = req.file.path
            const quantity = req.body.quantity
            const price = req.body.price
            const product = new Product({ name: name, des: des, img: img, quantity: quantity, price: price })
            product.save()
            res.send({ product })
        } catch (error) {
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
            const name = req.body.name
            const des = req.body.des
            const img = req.file.path
            const time = req.body.time
            const price = req.body.price
            const treatment = new Treatment({ name: name, des: des, img: img, time: time, price: price })
            treatment.save()
            res.send({ treatment })
        } catch (error) {
            res.status(500).json({
                error: 'Tạo sản phẩm mới không thành công'
            })
        }
    }

    async deleteTreatment(req, res, next) {
        await Treatment.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    async viewAppointment(req, res, next) {
        try {
            done = req.params.done
            paid = req.params.paid
            const appointments = await Appointment.find({ done: done, paid: paid })
            res.send({ appointments })
        } catch (error) {
            res.json({ error: error })
        }
    }

    async viewPayroll(req, res, next) {
        try {
            const employees = await Employee.find({ role: 'employee' }, 'name phoneNumber salary payroll')
            res.send({ employees })
        } catch (error) {
            res.json({ error: error })
        }
    }
}

module.exports = new AdminController