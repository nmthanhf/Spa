const Product = require('../models/Product')
const Cart = require('../models/Cart')
const ProductController = require('../controllers/ProductController')
class CartController {
    addItemToCart = async (req, res) => {
        const {
            productId
        } = req.body;
        const amount = Number.parseInt(req.body.amount);
        try {
            let cart = await Cart.findOne({Customer_id: req.user._id})
            let product = await ProductController.getById(productId);
            if (!product) {
                return res.status(500).json({
                    message: 'Không tìm thấy sản phẩm'
                })
            }
            //Nếu giỏ hàng của người này đã đồn tại
            if (cart) {
                //Kiểm tra xem sản phẩm đã có chưa
                const indexFound = cart.items.findIndex(item => item.productId == productId);
                //Xoá khỏi giỏ hàng nếu số lượng nhỏ hơn 0
                if (indexFound !== -1 && amount <= 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.total = 0;
                    } else {
                        cart.total = cart.items.map(item => item.subtotal).reduce((acc, next) => acc + next);
                    }
                }
                //Nếu sản phẩm đã tồn tại thì tăng số lượng lên
                else if (indexFound !== -1) {
                    cart.items[indexFound].amount = cart.items[indexFound].amount + amount;
                    cart.items[indexFound].subtotal = cart.items[indexFound].amount * product.newPrice;
                    cart.items[indexFound].newPrice = product.newPrice
                    cart.total = cart.items.map(item => item.subtotal).reduce((acc, next) => acc + next);
                }
                //Kiểm tra xem Số lượng có lớn hơn 0 không thì thêm mục vào
                else if (amount > 0) {
                    cart.items.push({
                        productId: productId,
                        amount: amount,
                        newPrice: product.newPrice,
                        subtotal: parseInt(product.newPrice * amount)
                    })
                    cart.total = cart.items.map(item => item.subtotal).reduce((acc, next) => acc + next);
                }

                else {
                    return res.status(400).json({
                        message: 'Số lượng không thể nhỏ hơn 0'
                    })
                }
                let order = await cart.save();
                res.send({order
                })
            }
            //Nếu người dùng chưa có giỏ hàng, tạo giỏ hàng mới
            else {
                const cartData = {
                    Customer_id: req.user._id,
                    items: [{
                        productId: productId,
                        amount: amount,
                        subtotal: parseInt(product.newPrice * amount),
                        newPrice: product.newPrice
                    }],
                    total: parseInt(product.newPrice * amount)
                }
                cart =  await Cart.create(cartData)
                await cart.save();
                res.send({cart});
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                message: "Lại lỗi ở đâu r T.T"
            })
        }
    }


}

module.exports = new CartController
