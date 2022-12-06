const userRouter = require('./user')
const adminRouter = require('./admin')
const employeeRouter = require('./employee')
const appointmentRouter = require('./appointment')
function route(app) {
  //Quản lý người dùng
  app.use('/user', userRouter)
  
  app.use('/admin', adminRouter)

  app.use('/employee',employeeRouter)

  app.use('/appointment', appointmentRouter)
}

module.exports = route
