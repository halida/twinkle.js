import { AssertionError } from 'assert'
import { transactional } from '../../support/transactional'
import { member } from '../../factories/users'
import { CreateUser } from '../../../services/users/create'

describe('CreateUser', () => {
  transactional()

  let user

  beforeEach(async () => {
    user = await member.build()
  })

  context('when all params valid', async function () {
    it('creates a user', async function () {
      const record = await new CreateUser(
        { password: 'qwerty101', passwordConfirmation: 'qwerty101', ...user.get({ plain: true }) },
        { transaction: this.transaction }
      ).call()

      expect(record.isNewRecord).to.be.false
      expect(record.password).to.not.equal('qwerty101')
    })
  })

  context('when passwords are not equal', async function () {
    it('creates a user', async function () {
      const service = await new CreateUser(
        { password: 'qwerty101', passwordConfirmation: 'qwerty102', ...user.get({ plain: true }) },
        { transaction: this.transaction }
      )

      expect(service.call()).to.be.rejectedWith(AssertionError)
    })
  })
})
