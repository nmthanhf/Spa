const express = require('express');
const multer = require('../app/config/multe')
const AdminController = require('../app/controllers/AdminController')
const auth = require ('../app/middleware/auth')
const router = express.Router()

router.post('/addProduct', auth.isAdmin ,multer.upload.array('files', 4), AdminController.createProduct)
router.post('/addTreatment',  auth.isAdmin, multer.upload.array('files', 4), AdminController.createTreatment)

router.post('/deleteProduct/:id', auth.isAdmin, AdminController.deleteProduct)
router.post('/deleteTreatment/:id', auth.isAdmin, AdminController.deleteTreatment)

router.post('/appointment/', auth.isAdmin, AdminController.viewAllAppointment)
router.post('/payroll', auth.isAdmin, AdminController.viewPayroll)

module.exports = router
