import { gql } from 'apollo-server-core'
import { createTestClient } from 'apollo-server-integration-testing'
import { createApolloServer } from '../../lib/graphql'

describe('root', () => {
  let client

  beforeAll(async () => {
    const apolloServer = await createApolloServer()
    client = createTestClient({ apolloServer })
  })

  describe('Queries', () => {
    describe('sayHello', () => {
      it('returns a valid response', async () => {
        const { data } = await client.query(gql`query { sayHello(name: "Homer" ) }`)

        expect(data).toEqual({ sayHello: 'Hello Homer!' })
      })
    })
  })

  describe('Mutations', () => {
    describe('sayHello', () => {
      it('returns a valid response', async () => {
        const { data } = await client.query(gql`mutation { sayHello(name: "Homer" ) }`)

        expect(data).toEqual({ sayHello: 'Hello Homer!' })
      })
    })
  })
})
