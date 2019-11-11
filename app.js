import Koa from 'koa'
import koaBody from 'koa-bodyparser'
import { router } from './config/routes.js'
import { apolloServer } from './api/apollo.js'

const app = new Koa()

apolloServer.applyMiddleware({ app })

app.use(koaBody())
app.use(router.routes())
app.use(router.allowedMethods())

const serverPort = process.env.PORT || 3000
app.listen(serverPort)
console.log(`Start listening on http://0.0.0.0:${serverPort}`)
