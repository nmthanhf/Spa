const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    amount: {
        type: Number,
        required: true,
        min: [1, 'Số lượng không thể nhỏ hơn 1']
    },
}, {
    timestamps: true
})
const OrderSchema = new Schema({
    items: [ItemSchema],
    total: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('Order', OrderSchema);