const Course = require("../models/User")
const {multipleMongooseToObject, mongooseToObject} = require('../../util/mongoose')
class HomeController {
    index(req, res, next) {
        Course.find({})
        .then(courses => {
                res.render('home', { 
                    courses: multipleMongooseToObject (courses)
                })})
        .catch(error => next(error))
    }


    show(req, res, next) {
        Course.findOne({slug: req.params.slugs})
        .then(course => {
            res.render('courses/product', {course: mongooseToObject(course)})
        })
        .catch(next)
    }
}

module.exports = new HomeController
 