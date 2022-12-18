const { text } = require('body-parser');
const Product = require('../models/Product')


class ProductController {
    async getProducts(req, res, next) {
        const products = await Product.find({})
        res.send({ products })
    }

    async getProductById(req, res, next) {
        const id = req.params.id
        try {
        const product = await Product.findById(id);
        return res.send({product})
        } catch (error) {
            console.log(error)
            return res.json({message: 'Không tìm thấy sản phẩm'})
        }
}


    async search(req, res, next) {
        const text = req.params.text
        try {
            const products = await Product.find({$text: {$search: text}})
            return res.send({products})
        } catch (error) {
            console.log(error)
            return res.json({message: error.message})
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
    async updateAmout(id, amount) {
        try {
            let update = parseInt(amount*(-1))
            await Product.updateOne({_id: id}, {$inc: {amount: update}})
        } catch(error){
            console.log(error)
        }
    }
}

module.exports = new ProductController
