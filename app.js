const Koa = require('koa')
const User = require('./models/user')

const app = new Koa()

app.use(async (ctx) => {
  const users = await User.findAll()

  console.log(users)

  ctx.body = 'Hello World'
})

const serverPort = process.env.PORT || 3000
app.listen(serverPort)

console.log(`Start listening on http://0.0.0.0:${serverPort}`)
