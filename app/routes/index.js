const AuthRouter = require('./auth-route')
const CommentRouter = require('./comment-route')
const DocsRouter = require('./docs-route')
const ForumRouter = require('./forum-route')

const _routes = [
  ['/api/auth', AuthRouter],
  ['/api/forums', ForumRouter],
  ['/api/docs', DocsRouter],
  ['/api/comments', CommentRouter],
]

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = routes
