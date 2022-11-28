const userRouter = require('./user')
const employeeRouter = require('./employee')
const appointmentRouter = require('./appointment')
const adminRouter = require('./admin')
const productRouter = require('./product')
const treatmentRouter = require('./treatment')
const cartRouter = require('./cart')

function route(app) {
  //Quản lý người dùng
  app.use('/user', userRouter)
  //Quản lý nhân viên
  app.use('/employee', employeeRouter)
  //Quanr lý lịch hẹnW
  app.use('/appointment', appointmentRouter)
  //Quan trị vien
  app.use('/admin', adminRouter)
  //Quản lý sản phẩm
  app.use('/product', productRouter)
  //Quản lý liệu trình 
  app.use('/treatment', treatmentRouter)
  // //Quản lý giỏ hàng
  app.use('/cart', cartRouter)
}

module.exports = route
