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
        type:String
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
    Service: {
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
