import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import { router } from './config/routes'
import { loadApi } from './config/graphql'

const app = new Koa()
const serverPort = process.env.PORT || 3000

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())

loadApi().then(apolloServer => {
  apolloServer.applyMiddleware({ app })
  console.log(`💠 GraphQL playground available at http://localhost:${serverPort}/graphql`)

  app.listen(serverPort)
  console.log(`🚀 Start listening on http://0.0.0.0:${serverPort}`)
})
