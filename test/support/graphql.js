import { createTestClient } from 'apollo-server-integration-testing'
import { createApolloServer } from '../../lib/graphql'

export async function buildClient ({ user, transaction } = {}) {
  const apolloServer = await createApolloServer()
  const headers = {}

  if (user) {
    headers.authorization = `Bearer ${user.generateToken()}`
  }

  return createTestClient({
    apolloServer,
    extendMockRequest: {
      headers: headers,
      transaction: transaction
    }
  })
}
