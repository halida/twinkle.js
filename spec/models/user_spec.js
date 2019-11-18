import { member } from '../factories/users'

describe('User', () => {
  let user

  beforeEach(() => {
    user = member.build()
  })

  it('doesn`t fail when all attributes are valid', async () => {
    try {
      await user.validate()
    } catch (e) {
      fail('User has invalid attributes')
    }
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
})
