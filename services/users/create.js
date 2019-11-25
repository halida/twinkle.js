import { strictEqual } from 'assert'
import { hash } from 'bcryptjs'
import { Base } from '../base'
import { User } from '../../models'

const HASH_ROUNDS = 12

export class CreateUser extends Base {
  constructor ({ role = 'member', login, email, password, passwordConfirmation }, options) {
    super(options)

    this.role = role
    this.login = login
    this.email = email
    this.password = password
    this.passwordConfirmation = passwordConfirmation
  }

  async call () {
    strictEqual(this.passwordConfirmation, this.password)

    const password = await hash(this.password, HASH_ROUNDS)

    return User.create({ role: this.role, login: this.login, email: this.email, password },
      { transaction: this.transaction })
  }
}
