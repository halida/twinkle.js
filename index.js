import { createApp } from './lib/app'

const serverPort = process.env.PORT || 3000

createApp().then(app => {
  app.listen(serverPort)

  console.log(`💠 GraphQL playground available at http://localhost:${serverPort}/graphql`)
  console.log(`🚀 Start listening on http://0.0.0.0:${serverPort}`)
})
