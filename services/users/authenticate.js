import { compare } from 'bcryptjs'
import { sign } from '../../lib/jwt'

export class AuthenticateUser {
  constructor ({ user, password }) {
    this.user = user
    this.password = password
  }

  async call () {
    if (!await compare(this.password, this.user.password)) return

    return sign({ userId: this.user.id })
  }
}
