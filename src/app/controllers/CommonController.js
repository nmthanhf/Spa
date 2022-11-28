
const Product = require('../models/Product')
const Treatment = require('../models/Treatment')
class CommonController {
    async getProduct(req, res, next) {
        try {
            const product = await Product.find({ _id: req.params.id })
            res.send({ product })
        } catch (error) {
            res.json({ error: 'Không tìm thấy sản phẩm' })
        }
    }

    async getProducts(req, res, next) {
        try {
            const products = await Product.find({})
            res.send({ products })
        } catch (error) {
            res.json({ error: 'Không tìm thấy sản phẩm' })
        }
    }

    async getTreatment(req, res, next) {
        try {
            const treatment = await Treatment.find({ _id: req.params.id })
            res.send({ treatment })
        } catch (error) {
            res.json({ error: 'Không tìm thấy sản phẩm' })
        }
    }

    async getTreatments(req, res, next) {
        try {
            const treatments = await Treatment.find({})
            res.send({ treatments })
        } catch (error) {
            res.json({ error: 'Không tìm thấy sản phẩm' })
        }
    }

}

module.exports = new CommonController