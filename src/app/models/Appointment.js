const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({
    Customer_id: {
        type: String,
        
    },
    Technician_id: {
        type: String,
        required: true
    },
    Customer: {
        type: String,
    },
    Subject: {
        type: String,
    },
    StartTime: {
       type: String,
       required: true
    },
    EndTime: {
        type: String
    },
    Status: {
        type:String,
        default: 'Đang xử lý'
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
    Treatment_id: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    dayOfWeek: {
        type: String,
        required: true
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
