import { Base } from '../base'

export class UpdateUser extends Base {
  constructor (user, params, options) {
    super(options)

    this.user = user
    this.params = params
  }

  async call () {
    await this.user.update(this.params, { transaction: this.transaction })
  }
}
