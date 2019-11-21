import { sequelize } from '../../config/sequelize'
import { Account } from '../../models/account'
import { Membership } from '../../models/membership'

export class CreateAccount {
  constructor (owner, params) {
    this.owner = owner
    this.params = params
  }

  call () {
    return sequelize.transaction(async () => {
      const account = await Account.create(this.params)

      const membership = await Membership.create({
        userId: this.owner.id,
        accountId: account.id,
        role: 'owner'
      })

      return { account, membership }
    })
  }
}
