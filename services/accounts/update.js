import { Base } from '../base'

export class UpdateAccount extends Base {
  constructor (account, params, options) {
    super(options)

    this.account = account
    this.params = params
  }

  call () {
    return this.account.update(this.params, { transaction: this.transaction })
  }
}
