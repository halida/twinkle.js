import { compare } from 'bcryptjs'

export class AuthenticateUser {
  constructor ({ user, password }) {
    this.user = user
    this.password = password
  }

  async call () {
    if (!await compare(this.password, this.user.password)) return

    return this.user.generateToken()
  }
}
