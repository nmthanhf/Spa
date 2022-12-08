const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    Customer_id: {
        type: String
    },
    Technician_id: {
        type: String
    },
    Customer: {
        type: String,
    },
    Subject: {
        type: String,
    },
    StartTime: {
       type: String 
    },
    EndTime: {
        type: String
    },
    Status: {
        type:String,
        default: "Đang xử lý"
    },
    Technician: {
        type: String
    },
    Location: {
        type: String
    },
    Description: {
        type: String
    },
    Treatment: {
        type: Object
    },
    date: {
        type: String
    },
    dayOfWeek: {
        type: String
    },
    paid: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment
