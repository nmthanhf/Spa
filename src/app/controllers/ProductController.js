const Product = require('../models/Product')


class ProductController {
    async getProducts(req, res, next) {
        const products = await Product.find({})
        res.send({ products })
    }

    async getById(req, res, next) {
        id = req.params.id
        try {
        const product = await Product.findById(id);
        return res.send({product})
        } catch (error) {
            return res.json({message: 'Không tìm thấy sản phẩm'})
        }
}
    async getById(id) {
        try {
        const product = await Product.findById(id);
        return product
        } catch (error) {
            return 0;
        }
    }
}

module.exports = new ProductController
