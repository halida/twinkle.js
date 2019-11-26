import { BaseService } from '../base_service'

export class DeleteAccount extends BaseService {
  constructor (account, options) {
    super(options)

    this.account = account
  }

  call () {
    return this.account.destroy({ transaction: this.transaction })
  }
}
