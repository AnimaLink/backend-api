const AuthRouter = require('./auth-route')
const ForumRouter = require('./forum-route')

const _routes = [
  ['/api/auth', AuthRouter],
  ['/api/forums', ForumRouter],
]

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = routes
