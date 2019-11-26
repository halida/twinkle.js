import { BaseService } from '../base_service'

export class UpdateAccount extends BaseService {
  constructor (account, params, options) {
    super(options)

    this.account = account
    this.params = params
  }

  call () {
    return this.account.update(this.params, { transaction: this.transaction })
  }
}
