const express = require('express');
const homeController = require('../app/controllers/HomeController');
const router = express.Router()
router.get('/home', homeController.index)
router.get('/:slug', homeController.show)
router.get('/', homeController.index)


module.exports = router;