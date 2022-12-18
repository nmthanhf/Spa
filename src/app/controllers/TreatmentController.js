const Treatment = require('../models/Treatment')


class TreatmentController {
    async getTreatments(req, res, next) {
        const treatments = await Treatment.find({})
        res.send({ treatments })
    }

    async getTreatmentById(req, res, next) {
        const id = req.params.id
        try {
        const treatment = await Treatment.findById(id);
        return res.send({treatment})
        } catch (error) {
            console.log(error)
            return res.json({message: 'Không tìm thấy liệu trình'})
        }
}


    async search(req, res, next) {
        const text = req.params.text
        try {
            const treatments = await Treatment.find({$text: {$search: text}})
            return res.send({treatments})
        } catch (error) {
            console.log(error)
            return res.json({message: error.message})
        }
    }
}

module.exports = new TreatmentController
