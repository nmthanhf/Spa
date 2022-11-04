const User = require('../models/User')
const Employee = require('../models/Employee')
const Treatment = require('../models/Treatment')
const Appointment = require('../models/Appointment')
const moment = require('moment/moment')

class AppointmentController {
    //Đưa ra liệu trình, tên và id nhân viên
    // GET /appointment/userbooking
    //Ra:
    //{
    //     "treatments": [
    //         {
    //             "_id": "635abc3b65e45368d7b00f05",
    //             "des": "Chăm sóc da mặt",
    //             "img": "",
    //             "name": "Chăm sóc da mặt",
    //             "price": 1000000,
    //             "time": 2
    //         },
    //         {
    //             "_id": "635abce365e45368d7b00f06",
    //             "des": "Ủ dược liệu thiên nhiên toàn thân",
    //             "img": "",
    //             "name": "Ủ dược liệu thiên nhiên toàn thân",
    //             "price": 5000000,
    //             "time": 1
    //         }
    //     ],
    //     "employees": [
    //         {
    //             "_id": "635bf8c5071adf98db0d644c",
    //             "name": "Nguyễn Thanh Hà"
    //         },
    //         {
    //             "_id": "635bf8fe071adf98db0d6450",
    //             "name": "Hoàng Vũ Huy"
    //         }
    //     ]
    // }
    async index(req, res, next) {
        const treatments = await Treatment.find({})
        const employees = await Employee.find({}, "_id name")
        res.send({ treatments, employees })
    }
    //Đưa ra lịch làm việc của một nhân viên
    //Vào
    //POST /appointment/userbooking/6364d6682e2f89be4f1bd16d
    //Ra:
    // {
    //     "appointments": [
    //         {
    //             "_id": "6364d6682e2f89be4f1bd16d",
    //             "user_id": "635bf6e3a77f820646f73137",
    //             "user_name": "Nguyễn Minh Thành",
    //             "employee_id": "635bf8c5071adf98db0d644c",
    //             "employee_name": "Nguyễn Thanh Hà",
    //             "user_phoneNumber": "0000000001",
    //             "startDate": "2022-12-10T02:30:00.000Z",
    //             "endDate": "2022-12-10T04:30:00.000Z",
    //             "createdAt": "2022-11-04T09:07:52.608Z",
    //             "updatedAt": "2022-11-04T09:07:52.608Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "6364da100c874854478d942a",
    //             "user_id": "635bf6e3a77f820646f73137",
    //             "user_name": "Nguyễn Minh Thành",
    //             "employee_id": "635bf8c5071adf98db0d644c",
    //             "employee_name": "Nguyễn Thanh Hà",
    //             "user_phoneNumber": "0000000001",
    //             "startDate": "2022-12-01T02:30:00.000Z",
    //             "endDate": "2022-12-01T04:30:00.000Z",
    //             "createdAt": "2022-11-04T09:23:28.420Z",
    //             "updatedAt": "2022-11-04T09:23:28.420Z",
    //             "__v": 0
    //         }
    //     ]
    // }
    async show(req, res, next) {
        const employee_id = req.params.id
        const appointments = await Appointment.find({ employee_id: employee_id, "endDate": { $gte: (new Date().getTime() - 1000 * 3600 * 24) } })
        res.send({ appointments })
    }
    //Đặt lịch POST /appointment/userbooking
    //Vào:
    // {
    //     "user": {
    //         "_id": "635bf6e3a77f820646f73137",
    //         "name": "Nguyễn Minh Thành",
    //         "phoneNumber": "0000000001"
    //     },
    //     "employee": {
    //         "_id": "635bf8c5071adf98db0d644c",
    //         "name" :"Nguyễn Thanh Hà"
    //     },
    //     "treatment": {
    //         "_id": "635abc3b65e45368d7b00f05",
    //         "time": "2"
    //     },
    //     "startTime": "09:30",
    //     "startDate": "2022-12-10"
    // }
    //Ra:
    // {
    //     "appointment": {
    //         "user_id": "635bf6e3a77f820646f73137",
    //         "user_name": "Nguyễn Minh Thành",
    //         "employee_id": "635bf8c5071adf98db0d644c",
    //         "employee_name": "Nguyễn Thanh Hà",
    //         "user_phoneNumber": "0000000001",
    //         "startDate": "2022-12-10T02:30:00.000Z",
    //         "endDate": "2022-12-10T04:30:00.000Z",
    //         "_id": "6364d6682e2f89be4f1bd16d"
    //     }
    // }
    async userBooking(req, res, next) {
        try {
            const user_id = req.body.user._id
            const user_name = req.body.user.name
            const user_phoneNumber = req.body.user.phoneNumber
            const employee_id = req.body.employee._id
            const employee_name = req.body.employee.name
            const time = parseInt(req.body.treatment.time)
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
                startDate: startDate, endDate: endDate
            })
            appointment.save()
            res.send({ appointment })
        } catch (error) {
            res.status(400).json({ error: 'Thông tin nhập vào không chính xác' })
        }
    }
}

module.exports = new AppointmentController
