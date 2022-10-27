const User = require('../models/User')
const Employee = require('../models/Employee')
const Treatment = require('../models/Treatment')
const Appointment = require('../models/Appointment')

class AppointmentController {
    //Đưa ra liệu trình, tên và id nhân viên
    async index(req, res, next) {
        const treatment = await Treatment.find({})
        const employees = await Employee.find({}, '_id name')
        res.send({employees, treatment})
    }
    //Lịch hẹn việc cụ thể của một nhân viên
    async show(req, res, next) {
        const employee_id = req.params.id
        const appointments = await Appointment.find({employee_id: employee_id})
        res.send({appointments})
    }
    

   async userBooking(req, res, next) {

   }
}

module.exports = new AppointmentController
