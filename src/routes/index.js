const userRouter = require('./user')
const adminRouter = require('./admin')
const employeeRouter = require('./employee')
const appointmentRouter = require('./appointment')
const productRouer = require('./product')
const cartRouter = require('./cart')
const treatmentRouter = require('./treatment')
const homeRouter = require('./home')
function route(app) {
  //Quản lý người dùng
  app.use('/user', userRouter)
  
  app.use('/admin', adminRouter)

  app.use('/employee',employeeRouter)

  app.use('/appointment', appointmentRouter)

  app.use('/product', productRouer)

  app.use ('/cart', cartRouter)

  app.use('/treatment', treatmentRouter)

  app.use('/home', homeRouter)
}

module.exports = route
