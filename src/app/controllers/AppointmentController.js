const User = require('../models/User')
const Employee = require('../models/Employee')
const Treatment = require('../models/Treatment')
const Appointment = require('../models/Appointment')
const moment = require('moment/moment')

class AppointmentController {
    //Đưa ra liệu trình, tên và id nhân viên
    // GET /appointment/userbooking
    //Ra:
    // {
    //     "employees": [
    //         {
    //             "_id": "635bf8c5071adf98db0d644c",
    //             "name": "Nguyễn Thanh Hà"
    //         },
    //         {
    //             "_id": "635bf8fe071adf98db0d6450",
    //             "name": "Hoàng Vũ Huy"
    //         }
    //     ],
    //     "treatment": [
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
    //     ]
    //}
    async index(req, res, next) {
        const treatment = await Treatment.find({})
        const employees = await Employee.find({}, '_id name')
        res.send({employees, treatment})
    }
    //Lịch hẹn việc cụ thể của một nhân viên
    // GET /apportment/userbooking/:id
    //Vào: /appointment/userbooking/635bf8c5071adf98db0d644c
    //Ra:
    //{
    //     "appointments": [
    //         {
    //             "_id": "635bfe02f7e177603c44e15b",
    //             "user_id": "635bf6e3a77f820646f73137",
    //             "user_name": "Nguyễn Minh Thành",
    //             "employee_id": "635bf8c5071adf98db0d644c",
    //             "employee_name": "Nguyễn Thanh Hà",
    //             "user_phoneNumber": "0000000001",
    //             "startDate": "2022-12-10T00:00:00.000Z",
    //             "startTime": "07:28",
    //             "endtTime": "09:28",
    //             "createdAt": "2022-10-28T16:06:26.015Z",
    //             "updatedAt": "2022-10-28T16:06:26.015Z",
    //             "__v": 0
    //         },
    //         {
    //             "_id": "635bfe45f7e177603c44e160",
    //             "user_id": "635bf6e3a77f820646f73137",
    //             "user_name": "Nguyễn Minh Thành",
    //             "employee_id": "635bf8c5071adf98db0d644c",
    //             "employee_name": "Nguyễn Thanh Hà",
    //             "user_phoneNumber": "0000000001",
    //             "startDate": "2022-12-10T00:00:00.000Z",
    //             "startTime": "10:22",
    //             "endtTime": "11:22",
    //             "createdAt": "2022-10-28T16:07:33.575Z",
    //             "updatedAt": "2022-10-28T16:07:33.575Z",
    //             "__v": 0
    //         }
    //     ]
    // }
    async show(req, res, next) {
        const employee_id = req.params.id
        const appointments = await Appointment.find({employee_id: employee_id})
        res.send({appointments})
    }
    //Đặt lịch POST /appointment/userbooking
    //Vào:
    // {
    //     "user": {
    //         "_id": "635bf6e3a77f820646f73137",
    //         "name": "Nguyễn Minh Thành",
    //         "phoneNumber": "0000000001"
    //         },
    //     "employee": {
    //         "_id": "635bf8c5071adf98db0d644c",
    //         "name": "Nguyễn Thanh Hà"
    //     },
    //     "startDate": "2022-12-10",
    //     "startTime": "10:22",
    //     "treatment" : {
    //         "_id": "635abce365e45368d7b00f06"
    //     }
    // }
    //Ra:
    // {
    //     "appointment": {
    //         "user_id": "635bf6e3a77f820646f73137",
    //         "user_name": "Nguyễn Minh Thành",
    //         "employee_id": "635bf8c5071adf98db0d644c",
    //         "employee_name": "Nguyễn Thanh Hà",
    //         "user_phoneNumber": "0000000001",
    //         "startDate": "2022-12-10T00:00:00.000Z",
    //         "startTime": "10:22",
    //         "endtTime": "11:22",
    //         "_id": "635bfe45f7e177603c44e160"
    //     }
    // }
   async userBooking(req, res, next) {
    try{
        const user_id = req.body.user._id
        const user_name = req.body.user.name
        const user_phoneNumber = req.body.user.phoneNumber
        const employee_id = req.body.employee._id
        const employee_name = req.body.employee.name
        const treatment = await Treatment.findById(req.body.treatment._id, 'time')
        const time = treatment.time
        const startDate = new Date(req.body.startDate)
        const startTime = String(req.body.startTime)
        const hours = parseInt(startTime.slice(0,2))
        const minutes = parseInt(startTime.slice(3))
        const endtTime = String(((hours + time)<10? "0"+(hours + time):(hours + time))  + ":" + minutes)
        const appointment = new Appointment ({user_id:user_id, user_name:user_name, user_phoneNumber:user_phoneNumber, 
        employee_id:employee_id, employee_name:employee_name, startDate: startDate, startTime:startTime, endtTime: endtTime})
        appointment.save()
        res.send({appointment})
    } catch (error) {
        console.log(error)
    }
   }
}

module.exports = new AppointmentController
