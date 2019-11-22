import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import { router } from '../config/routes'
import { createApolloServer } from './graphql'

export async function createApp () {
  const app = new Koa()

  app.use(koaBody())
  app.use(router.routes())
  app.use(router.allowedMethods())

  const apolloServer = await createApolloServer()
  apolloServer.applyMiddleware({ app })

  return app
}
