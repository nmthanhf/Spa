const mongoose = require('mongoose')
const treatmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Cần có tên liệu trình']
    },
    oldPrice: {
        type: Number
    },
    newPrice: {
        type: Number,
        required: [true, 'Cần có giá mới nhất của liệu trình']
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
        required: [true, 'Cần có thời gian thực hiện liệu trình']
    },
    ingredient: {
        type: Array
    },
    startDate: {
        type: String
    },
    bonus: {
        type:Number,
        required: [true, 'Cần có hoa hồng khi hoàn thành']
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
})

const Treatment = mongoose.model('Treatment', treatmentSchema)

module.exports = Treatment
