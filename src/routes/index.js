const userRouter = require('./user')
const employeeRouter = require('./employee')
const appointmentRouter = require('./appointment')

function route(app) {
  //Quản lý người dùng
  app.use('/user', userRouter)
  //Quản lý nhân viên
  app.use('/employee', employeeRouter)
  //Quanr lý lịch hẹnW
  app.use('/appointment', appointmentRouter)
}

module.exports = route
 