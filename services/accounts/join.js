import { Membership } from '../../models/membership'

export class JoinAccount {
  constructor (account, user) {
    this.account = account
    this.user = user
  }

  call () {
    return Membership.create({ userId: this.user.id, accountId: this.account.id })
  }
}
