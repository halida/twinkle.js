import { strictEqual } from 'assert'
import { hash } from 'bcryptjs'
import { User } from '../../models'

const HASH_ROUNDS = 12

export class CreateUser {
  constructor ({ role = 'member', login, email, password, passwordConfirmation }) {
    this.role = role
    this.login = login
    this.email = email
    this.password = password
    this.passwordConfirmation = passwordConfirmation
  }

  async call () {
    strictEqual(this.passwordConfirmation, this.password)

    const password = await hash(this.password, HASH_ROUNDS)

    return User.create({ role: this.role, login: this.login, email: this.email, password })
  }
}
