const userRouter = require('./user')

function route(app) {
  //Quản lý người dùng
  app.use('/user', userRouter)
}

module.exports = route
