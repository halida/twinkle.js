import { gql } from 'apollo-server-core'
import { createTestClient } from 'apollo-server-integration-testing'
import { createApolloServer } from '../../lib/graphql'

describe('root', () => {
  let client

  before(async () => {
    const apolloServer = await createApolloServer()
    client = createTestClient({ apolloServer })
  })

  describe('Queries', () => {
    describe('sayHello', () => {
      it('returns a valid response', async () => {
        const { data } = await client.query(gql`query { sayHello(name: "Homer" ) }`)

        expect(data).to.include({ sayHello: 'Hello Homer!' })
      })
    })
  })

  describe('Mutations', () => {
    describe('sayHello', () => {
      it('returns a valid response', async () => {
        const { data } = await client.query(gql`mutation { sayHello(name: "Homer" ) }`)

        expect(data).to.include({ sayHello: 'Hello Homer!' })
      })
    })
  })
})
