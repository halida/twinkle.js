import { Base } from '../base'

export class DeleteAccount extends Base {
  constructor (account, options) {
    super(options)

    this.account = account
  }

  call () {
    return this.account.destroy({ transaction: this.transaction })
  }
}
