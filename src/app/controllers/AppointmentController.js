const User = require('../models/User')
const Treatment = require('../models/Treatment')
const Appointment = require('../models/Appointment')


class AppointmentController {
    // Đưa ra tất cả đặt lịch hiện có
    async index(req, res, next) {
        const appointments = await Appointment.find({})
        return res.send({ appointments })
    }
    //Em có đẩy ra cả danh sách technicians, đến lúc đặt lịch anh đẩy thêm Technician_id vào giúp em
    async book(req, res, next) {
        const technicians = await User.find({ role: 'employee' })
        const treatments = await Treatment.find({})
        return res.send({ technicians, treatments })
    }

    //Xem tất cả đặt lịch của một người dùng
    //GET /appointment/view
    async view(req, res, next) {
        const appointments = await Appointment.find({ Custom_id: req.user._id, EndTime: { $gte: (new Date().getTime() - 1000 * 3600 * 24) } })
        return res.send({ appointments })
    }

    //Xem thông tin chi tiết một lịch đã đặt
    //GET /appointment/view/detail/:id
    async viewDetail(req, res, next) {
        const _id = req.params.id
        console.log(_id)
        try {
            const appointment = await Appointment.findById(_id)
            return res.send(appointment)
        } catch (error) {
            return res.json({ error: 'Không tìm thấy đặt lịch' })
        }
    }

    //Sửa thông tin đặt lịch
    // PATCH /appointment/:id/edit
    async edit(req, res, next) {
        const _id = req.params.id
        try {
            await Appointment.updateOne({ _id: _id }, req.body)
            const appointment = await Appointment.findById(_id)
            return res.send({appointment})
        } catch (error) {
            return res.json({ error: 'Cập nhật thông tin lịch hẹn không thành công' })
        }
    }

    async userBooking(req, res, next) {
        //Tạo ngày dựa vào chọn ngày
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
            
            var EndTime = new Date(StartTime.getTime() + time*60*1000);
            req.body.StartTime = StartTime
            req.body.EndTime = EndTime
            
            //Lấy ra thông tin khách hàng khách hàng
            const user = await User.findById(req.user._id)
            req.body.Customer_id = user._id
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
            return res.json({ message: error.message})
        }
    }

    //Lịch làm việc của một nhân viên
    async employeeView(req, res, next) {
        try {
        const appointments = await Appointment.find({ Technician_id: req.user._id, EndTime: { $gte: (new Date().getTime() - 1000 * 3600 * 24) } })
        return res.send({ appointments })
        } catch (error) {
            return res.json({message: 'Không tìm thấy nhân viên'})
        }
    }

    //Xem thông tin chi tiết một lịch đã đặt
    //GET /appointment/employee/view/detail/:id
    async employeeViewDetail(req, res, next) {
        const _id = req.params.id
        console.log(_id)
        try {
            const appointment = await Appointment.findById(_id)
            return res.send({appointment})
        } catch (error) {
            console.log(error)
            return res.json({ error: 'Không tìm thấy đặt lịch' })
        }
    }

    //Sửa thông tin đặt lịch
    // PATCH /appointment/:id/employeeEdit
    async employeeEdit(req, res, next) {
        const _id = req.params.id
        try {
            await Appointment.updateOne({ _id: _id }, req.body)
            const appointment = await Appointment.findById(_id)
            return res.send(appointment)
        } catch (error) {
            return res.json({ error: 'Cập nhật thông tin lịch hẹn không thành công' })
        }
    }

    async delete(req, res, next) {
        try {
        await Appointment.deleteOne({ _id: req.params.id })
        return res.json({message: 'Xoá đặt lịch thành công'})
        } catch (error) {
            console.log(error)
            return res.json({message: 'Xoá đặt lịch thất bại'})
        }
    }

    async finish(req, res, next) {
        const _id = req.params.id
        try {
        const appointment = await Appointment.findById(_id)
        if (appointment.Status.localeCompare('Đang xử lý') == 0) {
        await Appointment.updateOne ({_id: _id}, {$set: {Status: 'Đã hoàn thành'}})
        const treatment = await Treatment.findById(appointment.Treatment_id)
        const val = (treatment.bonus)/100 * treatment.newPrice
        await User.updateOne({_id: appointment.Technician_id}, {$inc: {payroll: val}})
        const employee = await User.findById(appointment.Technician_id)
        return res.status(200).json({message: 'Đã hoàn thành lịch vừa chọn'})
        } else {
            return res.json({message: 'Đặt lịch đã được đánh dấu hoàn thành trước đó'})
        }
        } catch (error) {
            res.json({message: error.message})
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
            const user = await User.findOne({ email: req.body.email })
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
            return res.send({ appointment })
        } catch (error) {
            console.log(error)
            return res.json({ message: error.message })
        }

    }


}

module.exports = new AppointmentController
