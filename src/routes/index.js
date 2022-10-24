const accountRouter = require('./account')
const homeRouter = require('./home')
const userRouter = require('./user')
function route(app) {
  app.use('/account', accountRouter)
  app.use('/home', homeRouter)
  app.use('/user', userRouter)
  app.use('/', homeRouter)
}

module.exports = route
