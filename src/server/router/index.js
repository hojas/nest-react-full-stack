const Router = require('@koa/router')

const router = new Router()

router.get('/api/hello', (ctx, next) => {
  ctx.body = 'hello'
})

module.exports = app => {
  app.use(router.routes()).use(router.allowedMethods())
}
