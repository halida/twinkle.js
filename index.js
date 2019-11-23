import config from './config'
import { createApp } from './lib/app'

createApp().then(app => {
  app.listen(config.server.port)

  console.log(`💠 GraphQL playground available at http://localhost:${config.server.port}/graphql`)
  console.log(`🚀 Start listening on http://0.0.0.0:${config.server.port}`)
})
