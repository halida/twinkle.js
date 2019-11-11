import * as rootApi from './root.js'
import * as usersApi from './users.js'

export const typeDefs = []
export const resolvers = []

for (const api of [rootApi, usersApi]) {
  if (api.typeDefs) {
    typeDefs.push(api.typeDefs)
  }

  if (api.resolvers) {
    resolvers.push(api.resolvers)
  }
}
