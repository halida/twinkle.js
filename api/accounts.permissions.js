import { rule, chain } from 'graphql-shield'
import { isAuthenticatedMember } from './root.permissions'
import { Account } from '../models/account'
import { Membership } from '../models/membership'

const accountExist = rule({ cache: 'contextual' })(
  async (_, { accountId }, context) => {
    context.account = await Account.findByPk(accountId)
    return !!context.account
  }
)

const accountMemberIsOwner = rule({ cache: 'contextual' })(
  async (_, { accountId }, context) => {
    context.membership = await Membership.findOne({ where: { accountId: accountId, userId: context.user.id, role: 'owner' } })
    return !!context.membership
  }
)

export const permissions = {
  Mutation: {
    updateAccount: chain(isAuthenticatedMember, accountExist, accountMemberIsOwner)
  }
}
