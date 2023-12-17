const AnimalRouter = require('./animal-route')
const AuthRouter = require('./auth-route')
const CommentRouter = require('./comment-route')
const DocsRouter = require('./docs-route')
const ForumCategoryRouter = require('./forum-category-route')
const ForumRouter = require('./forum-route')
const ForumStatusRouter = require('./forum-status-route')
const ForumTypeRouter = require('./forum-type-route')
const UserRouter = require('./user-route')

const _routes = [
  ['/api/auth', AuthRouter],
  ['/api/forums', ForumRouter],
  ['/api/docs', DocsRouter],
  ['/api/forums/comments', CommentRouter],
  ['/api/forums/statuses', ForumStatusRouter],
  ['/api/forums/categories', ForumCategoryRouter],
  ['/api/forums/types', ForumTypeRouter],
  ['/api/animals', AnimalRouter],
  ['/api/users', UserRouter],
]

const routes = (app) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

module.exports = routes
