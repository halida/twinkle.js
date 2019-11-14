import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa'
import { router } from './config/routes.js'
import { loadApi } from './config/graphql.js'

const app = new Koa()

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())

loadApi().then(api => {
  const schema = makeExecutableSchema(api)
  const apolloServer = new ApolloServer({ schema })
  apolloServer.applyMiddleware({ app })
  console.log(`💠 GraphQL playground available at http://localhost:${serverPort}/graphql`)
})

const serverPort = process.env.PORT || 3000
app.listen(serverPort)
console.log(`Start listening on http://0.0.0.0:${serverPort}`)
