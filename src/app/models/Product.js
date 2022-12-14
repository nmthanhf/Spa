const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Cần có tên sản phẩm']
    },
    oldPrice: {
        type: Number
    },
    newPrice: {
        type: Number,
        required: [true, 'Cần có giá mới nhất']
    },
    mainImage: {
        id: {
            type: String
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
    color: {
        type: Array
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
        type: String
    },
    tags: {
        type: Array
    },
    startDate: {
        type: String
    },
    properties: {
        _id: mongoose.Schema.Types.ObjectId,
        type: Array
    },
    productCode: {
        type: String
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
