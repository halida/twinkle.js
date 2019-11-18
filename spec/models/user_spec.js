import { member } from '../factories/users'

describe('User', () => {
  let user

  beforeEach(async () => {
    user = await member.build()
  })

  it('doesn`t fail when all attributes are valid', async function () {
    await this.transactional(async () => user.save())
  })

  it('fails when email is invalid', async () => {
    user.email = 'wrong-value'

    try {
      await user.validate()
      fail('User email should not be valid')
    } catch (e) {
      expect(e.errors[0].path).toEqual('email')
    }
  })

  it('fails when login is invalid', async () => {
    user.login = ''

    try {
      await user.validate()
      fail('User login should not be valid')
    } catch (e) {
      expect(e.errors[0].path).toEqual('login')
    }
  })

  it('requires a long password', async () => {
    user.password = '123456'

    try {
      await user.validate()
      fail('User password should not be valid')
    } catch (e) {
      expect(e.errors[0].path).toEqual('password')
      expect(e.errors[0].validatorName).toEqual('len')
    }
  })

  it('fails when login already exists', async function () {
    await this.transactional(async function () {
      await user.save()

      const anotherUser = await member.build({ login: user.login.toUpperCase() })

      try {
        await anotherUser.save()
        fail('User login should not be valid')
      } catch (e) {
        expect(e.errors[0].validatorKey).toEqual('not_unique')
      }
    })
  })

  it('fails when email already exists', async function () {
    await this.transactional(async function () {
      await user.save()

      const anotherUser = await member.build({ email: user.email.toUpperCase() })

      try {
        await anotherUser.save()
        fail('User email should not be valid')
      } catch (e) {
        expect(e.errors[0].validatorKey).toEqual('not_unique')
      }
    })
  })
})