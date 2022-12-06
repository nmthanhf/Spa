const express = require('express')
const path = require('path')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const bp = require('body-parser')
const dotenv = require("dotenv").config()
const methodOverride = require('method-override')
const app = express()
const port = 3000
const route = require('./routes')
const db = require('./app/config/db')

db.connect()
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'files', 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'resources', 'views'))
app.use('/files', express.static("files"));
app.use(methodOverride('X-HTTP-Method-Override'))
// app.use(methodOverride('_method'))
route(app);
app.listen(port, () => {
   console.log(`App listening on port ${port}`)
})
