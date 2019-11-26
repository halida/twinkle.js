import { gql } from 'apollo-server-core'
import { buildClient } from '../support/graphql'

describe('auth', () => {
  transactional()

  let client,
    user

  describe('Queries', () => {
    describe('currentUser', () => {
      describe('when user is authenticated', () => {
        beforeEach(async function () {
          user = await Factory.build('member')
            .save({ transaction: this.transaction })

          client = await buildClient({ user, transaction: this.transaction })
        })

        it('returns a valid response', async function () {
          const { data } = await client.query(gql`query { currentUser { id login } }`)
          expect(data).to.deep.include({ currentUser: { id: user.id, login: user.login } })
        })
      })

      describe('when user is unauthenticated', function () {
        beforeEach(async function () {
          client = await buildClient({ transaction: this.transaction })
        })

        it('returns an error', async function () {
          const { data, errors } = await client.query(gql`query { currentUser { id login } }`)

          expect(data.currentUser).to.be.null
          expect(errors[0].extensions.code).to.equal('FORBIDDEN')
        })
      })
    })
  })
})
