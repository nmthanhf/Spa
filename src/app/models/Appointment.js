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
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    treatment_name: {
        type: String,
        required: true
    },
    treatment_price: {
        type: Number,
        required: true
    },
    paid: {
        type: Boolean,
        default: false
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment
