const User = require('../models/User')
const Treatment = require('../models/Treatment')
const Appointment = require('../models/Appointment')
const { json } = require('body-parser')


class AppointmentController {
    // Đưa ra tất cả đặt lịch hiện có
    async index(req, res, next) {
        const appointments = await Appointment.find({})
        res.send({ appointments })
    }
    //Em có đẩy ra cả danh sách technicians, đến lúc đặt lịch anh đẩy thêm Technician_id vào giúp em
    async book(req, res, next) {
        const technicians = User.find({ role: 'employee' })
        const treatments = Treatment.find({})
        res.send({ technicians, treatments })
    }

    //Xem tất cả đặt lịch của một người dùng
    //GET /appointment/view
    async view(req, res, next) {
        const appointments = await Appointment.find({ Custom_id: req.user._id, "endDate": { $gte: (new Date().getTime() - 1000 * 3600 * 24) } })
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

    async userBooking(req, res, next) {
        //Tạo ngày dựa vào chọn ngày
        try {
            const dateCopy = new Date((new Date()).getTime());
            const date = new Date(
                dateCopy.setDate(
                    dateCopy.getDate() + ((7 - dateCopy.getDay() + req.body.dayOfWeek + 1) % 7 || 7),
                ))
            req.body.date = date

            //Tính thời gian bắt đầu và kết thúc
            //Lưu trong dữ liệu vd:"2022-12-12T04:50:00.329Z"
            var StartTime = String(req.body.StartTime)
            var hours = parseInt(StartTime.slice(0, 2))
            var minutes = parseInt(StartTime.slice(3))
            StartTime = new Date(date.setHours(hours, minutes, 0))
            var EndTime = String(req.body.EndTime)
            hours = parseInt(EndTime.slice(0, 2))
            minutes = parseInt(EndTime.slice(3))
            var EndTime = new Date(date.setHours(hours, minutes, 0))

            req.body.StartTime = StartTime
            req.body.EndTime = EndTime

            //Lấy ra thông tin khách hàng khách hàng
            req.body.Custom_id = req.user._id
            req.body.Customer = req.user.name

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

    //Lịch làm việc của một nhân viên
    async employeeView(req, res, next) {
        const appointments = await Appointment.find({ Technician_id: req.user._id, "endDate": { $gte: (new Date().getTime() - 1000 * 3600 * 24) } })
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
}

module.exports = new AppointmentController
