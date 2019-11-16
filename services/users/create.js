import { hash } from 'bcryptjs'
import { User } from '../../models/user'

const HASH_ROUNDS = 12

export class CreateUser {
  constructor ({ role, login, email, password, passwordConfirmation }) {
    this.role = role || 'member'
    this.login = login
    this.email = email
    this.password = password
    this.passwordConfirmation = passwordConfirmation
  }

  async call () {
    // TODO: Throw an validation error
    if (this.password !== this.passwordConfirmation) return

    const password = await hash(this.password, HASH_ROUNDS)

    return User.create({ role: this.role, login: this.login, email: this.email, password })
  }
}
