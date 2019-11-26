import { BaseService } from '../base_service'

export class UpdateUser extends BaseService {
  constructor (user, params, options) {
    super(options)

    this.user = user
    this.params = params
  }

  async call () {
    await this.user.update(this.params, { transaction: this.transaction })
  }
}
