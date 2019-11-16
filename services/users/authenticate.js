import { compare } from 'bcryptjs'
import { sign } from '../../config/jwt'

export class AuthenticateUser {
  constructor ({ user, password }) {
    this.user = user
    this.password = password
  }

  async call () {
    console.log(this.user.password)
    if (!await compare(this.password, this.user.password)) return

    return sign({ id: this.user.id, login: this.user.login, role: this.user.role })
  }
}
