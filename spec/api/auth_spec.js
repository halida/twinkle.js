import { gql } from 'apollo-server-core'
import { createTestClient } from 'apollo-server-integration-testing'
import { createApolloServer } from '../../lib/graphql'
import { member } from '../factories/users'

describe('auth', () => {
  let apolloServer
  let user
  let client

  beforeAll(async () => {
    apolloServer = await createApolloServer()
  })

  describe('Queries', () => {
    describe('currentUser', () => {
      describe('when user is authenticated', () => {
        it('returns a valid response', async function () {
          await this.transactional(async () => {
            user = await member.build().save()
            const token = user.generateToken()
            client = createTestClient(({ apolloServer, extendMockRequest: { headers: { authorization: `Bearer ${token}` } } }))

            const { data } = await client.query(gql`query { currentUser { id login } }`)
            expect(data).toEqual({ currentUser: { id: user.id, login: user.login } })
          })
        })
      })
    })
  })
})
