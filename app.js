import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import { router } from './config/routes'
import { loadApi } from './config/graphql'

// We intercept an assertion error in GraphQL
// to return it as UserInputError without a colored message
process.env.NODE_DISABLE_COLORS = true

const app = new Koa()
const serverPort = process.env.PORT || 3000

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())

loadApi(app).then(() => {
  app.listen(serverPort)

  console.log(`💠 GraphQL playground available at http://localhost:${serverPort}/graphql`)
  console.log(`🚀 Start listening on http://0.0.0.0:${serverPort}`)
})
