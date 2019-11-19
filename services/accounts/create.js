import { sequelize } from '../../config/sequelize'
import { Account } from '../../models/account'
import { Membership } from '../../models/membership'

export class CreateAccount {
  constructor ({ name, owner }) {
    this.name = name
    this.owner = owner
  }

  call () {
    return sequelize.transaction(async () => {
      const account = await Account.create({ name: this.name })
      const membership = await Membership.create({ userId: this.owner.id, accountId: account.id })

      return { account, membership }
    })
  }
}
