import * as rootApi from './root.js'
import * as usersApi from './users.js'

const files = [rootApi, usersApi]

export const typeDefs = []
export const resolvers = []

for (const api of files) {
  if (api.typeDefs) {
    typeDefs.push(api.typeDefs)
  }

  if (api.resolvers) {
    resolvers.push(api.resolvers)
  }
}
