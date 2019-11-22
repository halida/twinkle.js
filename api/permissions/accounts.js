import { rule, chain } from 'graphql-shield'
import { isMember } from './auth'
import { Account, Membership } from '../../models'

async function setMembershipContext (context) {
  context.membership = await Membership.findOne({
    where: { accountId: context.account.id, userId: context.user.id }
  })
}

export const isAccountExist = rule({ cache: 'strict' })(
  async (_, { accountId }, context) => {
    context.account = await Account.findByPk(accountId)
    return !!context.account
  }
)

export const isAccountOwner = rule({ cache: 'strict' })(
  async (_, { accountId }, context) => {
    await setMembershipContext(context)
    return !!(context.membership && context.membership.role === 'owner')
  }
)

export const isAccountAdmin = rule({ cache: 'strict' })(
  async (_, { accountId }, context) => {
    await setMembershipContext(context)
    return !!(context.membership && context.membership.role === 'admin')
  }
)

export const isAccountUser = rule({ cache: 'strict' })(
  async (_, { accountId }, context) => {
    await setMembershipContext(context)
    return !!(context.membership && context.membership.role === 'user')
  }
)

export const isAccountViewer = rule({ cache: 'strict' })(
  async (_, { accountId }, context) => {
    await setMembershipContext(context)
    return !!(context.membership && context.membership.role === 'viewer')
  }
)

export const permissions = {
  Query: {
    accounts: isMember
  },

  Mutation: {
    createAccount: chain(isMember),
    updateAccount: chain(isMember, isAccountExist, isAccountOwner),
    deleteAccount: chain(isMember, isAccountExist, isAccountOwner)
  }
}
