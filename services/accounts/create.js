import { BaseService } from '../base_service'
import { sequelize } from '../../lib/sequelize'
import { Account, Membership } from '../../models'

export class CreateAccount extends BaseService {
  constructor (owner, params, options) {
    super(options)

    this.owner = owner
    this.params = params
  }

  async call () {
    return sequelize.transaction({ transaction: this.transaction }, async function (transaction) {
      const account = await Account.create(this.params, { transaction })

      const membership = await Membership.create({
        userId: this.owner.id,
        accountId: account.id,
        role: 'owner'
      }, { transaction })

      return { account, membership }
    })
  }
}
