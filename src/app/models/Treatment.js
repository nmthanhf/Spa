const mongoose = require('mongoose')
const treatmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
    },
    oldPrice: {
        type: Number
    },
    newPrice: {
        type: Number,
        required: true
    },
    mainImage: {
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        src: {
            type: String
        }
    },
    extraImage1: {
        id: {
            type: String
        },
        src: {
            type: String
        }
    },
    extraImage2: {
        id: {
            type: String
        },
        src: {
            type: String
        }
    },
    extraImage3: {
        id: {
            type: String
        },
        src: {
            type: String
        }
    },
    view: {
        type: Number
    },
    rating: {
        type: Number
    },
    category: {
        type: String
    },
    status: {
        type: Array
    },
    tags: {
        type: Array
    },
    duration: {
        type: Number,
        required: true
    },
    ingredient: {
        type: Array
    },
    startDate: {
        type: String
    },
    bonus: {
        type:Number,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
})

const Treatment = mongoose.model('Treatment', treatmentSchema)

module.exports = Treatment
