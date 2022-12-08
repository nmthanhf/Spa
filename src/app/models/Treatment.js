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
        type: Number
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
    amount: {
        type:Number
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
        type: Number
    },
    ingredient: {
        type: Array
    },
    startDate: {
        type: String
    },
    bounus: {
        type:Object
    },
    brand: {
        type: String
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
})

const Treatment = mongoose.model('Treatment', treatmentSchema)

module.exports = Treatment
