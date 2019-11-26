import { ValidationError } from 'sequelize'

describe('User', () => {
  transactional()

  let user

  beforeEach(() => {
    user = Factory.build('member')
  })

  it('does not fail when all attributes are valid', async function () {
    await user.save({ transaction: this.transaction })
  })

  it('fails when email is invalid', async () => {
    user.email = 'wrong-value'
    expect(user.validate()).to.be.rejectedWith(ValidationError)
  })

  it('fails when login is invalid', async () => {
    user.login = ''
    expect(user.validate()).to.be.rejectedWith(ValidationError)
  })

  it('requires a long password', async () => {
    user.password = '123456'
    expect(user.validate()).to.be.rejectedWith(ValidationError)
  })

  it('fails when login already exists', async function () {
    await user.save({ transaction: this.transaction })
    const anotherUser = Factory.build('member', { login: user.login.toUpperCase() })
    expect(anotherUser.save({ transaction: this.transaction })).to.be.rejectedWith(ValidationError)
  })

  it('fails when email already exists', async () => {
    await user.save({ transaction: this.transaction })
    const anotherUser = Factory.build('member', { email: user.email.toUpperCase() })
    expect(anotherUser.save({ transaction: this.transaction })).to.be.rejectedWith(ValidationError)
  })

  describe('#generateToken', function () {
    context('when user is not persisted', function () {
      it('throws an error', function () {
        expect(() => user.generateToken()).to.throw(Error, /User should be saved/)
      })
    })

    context('when user is persisted', function () {
      it('throws an error', async function () {
        await user.save({ transaction: this.transaction })
        expect(user.generateToken()).to.be.a('string')
      })
    })
  })
})
