import { compare } from 'bcryptjs'
import { Base } from '../base'

export class AuthenticateUser extends Base {
  constructor ({ user, password }, options) {
    super(options)
    this.user = user
    this.password = password
  }

  async call () {
    if (!await compare(this.password, this.user.password)) return

    return this.user.generateToken()
  }
}
