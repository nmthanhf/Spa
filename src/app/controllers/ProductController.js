const Product = require('../models/Product')


class ProductController {
    async getProducts(req, res, next) {
        const products = await Product.find({})
        res.send({ products })
    }

    async getById(req, res, next) {
        id = req.params.id
        const product = await Product.findById(id);
        res.send({product})
}
    async getById(id) {
            const product = await Product.findById(id);
            return product
    }
}

module.exports = new ProductController
