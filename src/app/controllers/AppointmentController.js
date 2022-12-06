const User = require('../models/User')
const Treatment = require('../models/Treatment')
const Appointment = require('../models/Appointment')


class AppointmentController {
    // Đưa ra tất cả đặt lịch hiện có
    async index(req, res, next) {
        const appointments = await Appointment.find({})
        res.send({ appointments })
    }

    async book(req, res, next) {
        const employees = User.find({role: 'employee'})
        const treatments = Treatment.find({})
        res.send({employees, treatments})
    }

    //Đưa ra lịch làm việc của một nhân viên
    //POST /appointment/show/:id
    async show(req, res, next) {
        const employee_id = req.params.id
        const appointments = await Appointment.find({ employee_id: employee_id, "endDate": { $gte: (new Date().getTime() - 1000 * 3600 * 24) } })
        res.send({ appointments })
    }

    //Xem tất cả đặt lịch của một người dùng
    //GET /appointment/view
    async view(req, res, next) {
        const appointments = await Appointment.find({ user_id: req.user._id, "endDate": { $gte: (new Date().getTime() - 1000 * 3600 * 24) } })
        res.send({ appointments })
    }

    //Xem thông tin chi tiết một lịch đã đặt
    //GET /appointment/view/detail/:id
    async viewDetail(req, res, next) {
        const _id = req.params.id
        console.log(_id)
        try {
            const appointment = await Appointment.findById(_id)
            res.send(appointment)
        } catch (error) {
            res.json({ error: 'Không tìm thấy đặt lịch' })
        }
    }

    //Sửa thông tin đặt lịch
    // PATCH /appointment/:id/edit
    async edit(req, res, next) {
        const _id = req.params.id
        try {
            await Appointment.updateOne({ _id: _id }, req.body)
            const appointment = await Appointment.findById(_id)
            res.send(appointment)
        } catch (error) {
            res.json({ error: 'Cập nhật thông tin lịch hẹn không thành công' })
        }
    }

    // async userBooking(req, res, next) {
    //     try {
    //         const user_id = req.body.user._id
    //         const user_name = req.body.user.name
    //         const user_phoneNumber = req.body.user.phoneNumber
    //         const employee_id = req.body.employee._id
    //         const employee_name = req.body.employee.name
    //         const time = parseInt(req.body.treatment.time)
    //         const treatment_price = req.body.treatment.price
    //         const treatment_name = req.body.treatment.name
    //         const startTime = String(req.body.startTime)
    //         const startDate = new Date(req.body.startDate + "T" + startTime)
    //         const hours = parseInt(startTime.slice(0, 2))
    //         const minutes = parseInt(startTime.slice(3))
    //         const endtTime = String((hours + time) + ":" + minutes)
    //         const endDate = new Date(req.body.startDate + "T" + endtTime)
    //         var count = await Appointment.find({ employee_id: employee_id, startDate: { $gte: startDate, $lt: endDate } }).count()
    //         if (count == 0) {
    //             count = await Appointment.find({ employee_id: employee_id, endDate: { $gte: startDate, $lt: endDate } }).count()
    //         }
    //         if (count != 0) {
    //             return res.status(400).json({ error: 'Nhân viên đang bận trong khoảng thời gian này, mời đặt lịch vào thời gian khác hoặc với nhân viên khác' })
    //         }
    //         const appointment = new Appointment({
    //             user_id: user_id, user_name: user_name, user_phoneNumber: user_phoneNumber,
    //             employee_id: employee_id, employee_name: employee_name,
    //             treatment_name: treatment_name, treatment_price: treatment_price,
    //             startDate: startDate, endDate: endDate
    //         })
    //         appointment.save()
    //         res.send({ appointment })
    //     } catch (error) {
    //         res.status(400).json({ error: 'Thông tin nhập vào không chính xác' })
    //     }
    // }

    async userBooking(req, res, next) {
        const appointment = new Appointment(req.body)
        appointment.save()
        res.send({appointment})
    }

    //Lịch làm việc của một nhân viên
    async employeeView(req, res, next) {
        const appointments = await Appointment.find({ user_id: req.employee._id, "endDate": { $gte: (new Date().getTime() - 1000 * 3600 * 24) } })
        res.send({ appointments })
    }

    //Xem thông tin chi tiết một lịch đã đặt
    //GET /appointment/employee/view/detail/:id
    async employeeViewDetail(req, res, next) {
        const _id = req.params.id
        console.log(_id)
        try {
            const appointment = await Appointment.findById(_id)
            res.send(appointment)
        } catch (error) {
            res.json({ error: 'Không tìm thấy đặt lịch' })
        }
    }

    //Sửa thông tin đặt lịch
    // PATCH /appointment/:id/employeeEdit
    async employeeEdit(req, res, next) {
        const _id = req.params.id
        try {
            await Appointment.updateOne({ _id: _id }, req.body)
            const appointment = await Appointment.findById(_id)
            res.send(appointment)
        } catch (error) {
            res.json({ error: 'Cập nhật thông tin lịch hẹn không thành công' })
        }
    }

    async delete(req, res, next) {
        Appointment.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    async employeeBooking(req, res, next) {
        try {
            const user = await User.find({ phoneNumber: req.body.phoneNumber })
            const user_id = user._id
            const user_name = user.name
            const user_phoneNumber = user.phoneNumber
            const employee_id = req.body.employee._id
            const employee_name = req.body.employee.name
            const time = parseInt(req.body.treatment.time)
            const treatment_price = req.body.treatment.price
            const treatment_name = req.body.treatment.name
            const startTime = String(req.body.startTime)
            const startDate = new Date(req.body.startDate + "T" + startTime)
            const hours = parseInt(startTime.slice(0, 2))
            const minutes = parseInt(startTime.slice(3))
            const endtTime = String((hours + time) + ":" + minutes)
            const endDate = new Date(req.body.startDate + "T" + endtTime)
            var count = await Appointment.find({ employee_id: employee_id, startDate: { $gte: startDate, $lt: endDate } }).count()
            if (count == 0) {
                count = await Appointment.find({ employee_id: employee_id, endDate: { $gte: startDate, $lt: endDate } }).count()
            }
            if (count != 0) {
                return res.status(400).json({ error: 'Nhân viên đang bận trong khoảng thời gian này, mời đặt lịch vào thời gian khác hoặc với nhân viên khác' })
            }
            const appointment = new Appointment({
                user_id: user_id, user_name: user_name, user_phoneNumber: user_phoneNumber,
                employee_id: employee_id, employee_name: employee_name,
                treatment_name: treatment_name, treatment_price: treatment_price,
                startDate: startDate, endDate: endDate
            })
            appointment.save()
            res.send({ appointment })
        } catch (error) {
            res.json({ error: 'Không tìm thấy người dùng, hãy tạo thông tin cho khách hàng' })
        }
    }

    async done(req, res, next) {
        const _id = req.params.id
        try {
            await Appointment.updateOne({ _id: _id }, { $set: { done: 'true' } })
            const appointment = await Appointment.findById(_id)
            let commission = (appointment.treatment_price * 2 / 100)
            await Employee.updateOne({ _id: appointment.employee_id }, { $inc: { payroll: commission } })
            res.send(appointment)
        } catch (error) {
            console.log(error)
            res.json({ error: 'Cập nhật thông tin lịch hẹn không thành công' })
        }
    }
}

module.exports = new AppointmentController
