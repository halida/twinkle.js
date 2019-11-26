import { compare } from 'bcryptjs'
import { BaseService } from '../base_service'

export class AuthenticateUser extends BaseService {
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
