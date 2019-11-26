import { gql } from 'apollo-server-core'
import { buildClient } from '../support/graphql'

describe('root', () => {
  let client

  before(async () => {
    client = await buildClient()
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
