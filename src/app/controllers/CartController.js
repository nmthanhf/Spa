
const Cart = require('../models/Cart')
class CartController {
    async index(req, res, next) {
        try {
        const cart = await Cart.findOne({user_id: req.user._id})
        res.send({cart})
        } catch (error) {
            res.json({error: error})
        }
    }
}

module.exports = new CartController
