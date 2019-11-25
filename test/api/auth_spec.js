import { gql } from 'apollo-server-core'
import { transactional } from '../support/transactional'
import { setClient } from '../support/graphql'
import { member } from '../factories/users'

describe('auth', () => {
  transactional()

  async function setUser () {
    this.user = await member.build()
      .save({ transaction: this.transaction })
  }

  describe('Queries', () => {
    describe('currentUser', () => {
      describe('when user is authenticated', () => {
        beforeEach(async function () {
          await setUser.apply(this)
          await setClient.apply(this)
        })

        it('returns a valid response', async function () {
          const { data } = await this.client.query(gql`query { currentUser { id login } }`)
          expect(data).to.deep.include({ currentUser: { id: this.user.id, login: this.user.login } })
        })
      })
    })
  })
})
