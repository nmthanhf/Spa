const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Số lượng không thể nhỏ hơn 1']
    },
    newPrice: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})
const CartSchema = new Schema({
    Customer_id: {
        type: String
    },
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('cart', CartSchema);