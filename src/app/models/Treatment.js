const mongoose = require('mongoose')

const treatmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
})

const Treatment = mongoose.model('Treatment', treatmentSchema)

module.exports = Treatment
