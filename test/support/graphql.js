import { createTestClient } from 'apollo-server-integration-testing'
import { createApolloServer } from '../../lib/graphql'

export async function setClient () {
  const apolloServer = await createApolloServer()
  const headers = {}

  if (this.user) {
    const token = this.user.generateToken()
    headers.authorization = `Bearer ${token}`
  }

  this.client = createTestClient({
    apolloServer,
    extendMockRequest: {
      headers: headers,
      transaction: this.transaction
    }
  })
}
