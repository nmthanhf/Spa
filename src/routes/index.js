const userRouter = require('./user')
const employeeRouter = require('./employee')
function route(app) {
  //Quản lý người dùng
  app.use('/user', userRouter)
  //Quản lý nhân viên
  app.use('/employee', employeeRouter)
}

module.exports = route
 