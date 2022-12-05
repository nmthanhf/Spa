const express = require('express');
const multer = require('../app/config/multe')
const AdminController = require('../app/controllers/AdminController')
const auth = require ('../app/middleware/auth')
const router = express.Router()

router.post('/addProduct', auth.isAdmin ,multer.upload.array('files', 4), AdminController.createProduct)
router.post('/addTreatment',  auth.isAdmin, multer.upload.array('files', 4), AdminController.createTreatment)

module.exports = router
