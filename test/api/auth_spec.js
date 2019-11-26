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
    })
  })
})
