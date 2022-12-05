const userRouter = require('./user')
const adminRouter = require('./admin')

function route(app) {
  //Quản lý người dùng
  app.use('/user', userRouter)
  
  app.use('/admin', adminRouter)
}

module.exports = route
