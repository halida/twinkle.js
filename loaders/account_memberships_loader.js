import { Membership } from '../models/membership'
import { BaseLoader } from './base_loader'

export class AccountMembershipsLoader extends BaseLoader {
  constructor () {
    const batchLoader = async ids => {
      const memberships = await Membership
        .findAll({ where: { accountId: ids } })

      return ids.map(id => memberships.filter(membership => membership.accountId === id))
    }

    super(batchLoader)
  }
}
