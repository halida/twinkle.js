import { BaseLoader } from './base_loader'
import { Op } from 'sequelize'
import { Membership } from '../models/membership'

export class MembershipsByAccountLoader extends BaseLoader {
  constructor () {
    const batchLoader = async accountIds => {
      const memberships = await Membership
        .findAll({
          where: { accountId: { [Op.in]: accountIds } }
        })

      return accountIds.map(accountId => {
        return memberships.filter(membership => membership.accountId === accountId)
      })
    }

    super(batchLoader)
  }
}
