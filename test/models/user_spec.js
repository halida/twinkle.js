import { transactional } from '../support/transactional'
import { member } from '../factories/users'

describe('User', () => {
  transactional()

  let user

  beforeEach(async () => {
    user = await member.build()
  })

  it('does not fail when all attributes are valid', async function () {
    await user.save({ transaction: this.transaction })
  })

  it('fails when email is invalid', async () => {
    user.email = 'wrong-value'

    try {
      await user.validate()
      expect(false, 'User email should not be valid').to.be.true
    } catch (e) {
      expect(e.errors[0].path).to.equal('email')
    }
  })

  it('fails when login is invalid', async () => {
    user.login = ''

    try {
      await user.validate()
      expect(false, 'User login should not be valid').to.be.true
    } catch (e) {
      expect(e.errors[0].path).to.equal('login')
    }
  })

  it('requires a long password', async () => {
    user.password = '123456'

    try {
      await user.validate()
      expect(false, 'User password should not be valid').to.be.true
    } catch (e) {
      expect(e.errors[0].path).to.equal('password')
      expect(e.errors[0].validatorName).to.equal('len')
    }
  })

  it('fails when login already exists', async function () {
    await user.save({ transaction: this.transaction })

    const anotherUser = await member.build({ login: user.login.toUpperCase() })

    try {
      await anotherUser.save({ transaction: this.transaction })
      expect(false, 'User login should not be valid').to.be.true
    } catch (e) {
      expect(e.errors[0].validatorKey).to.equal('not_unique')
    }
  })

  it('fails when email already exists', async () => {
    await user.save({ transaction: this.transaction })

    const anotherUser = await member.build({ email: user.email.toUpperCase() })

    try {
      await anotherUser.save({ transaction: this.transaction })
      expect(false, 'User email should not be valid').to.be.true
    } catch (e) {
      expect(e.errors[0].validatorKey).to.equal('not_unique')
    }
  })
})
