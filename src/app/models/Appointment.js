const mongoose = require('mongoose')

const appointmentSchema = mongoose.Schema({

    user_id: {
        type: String,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
        trim: true
    },
    employee_id: {
        type: String,
        required: true,
    },
    employee_name: {
        type: String,
        required: true,
        trim: true
    },
    user_phoneNumber: {
        type: String,
        required: true,
    },
    startDate: {
        type:Date,
        required: true,
    },
    endDate: {
        type:Date,
        required: true,
    },
    // startTime: {
    //     type:String,
    //     required: true,
    // },
    // endtTime: {
    //     type:String,
    //     required: true,
    // }
}, {
    timestamps: true,
})
 
const Appointment = mongoose.model('Appointment', appointmentSchema)
 
module.exports = Appointment
