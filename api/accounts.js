import { Account } from '../models/account'
import { CreateAccount } from '../services/accounts/create'
import { UpdateAccount } from '../services/accounts/update'
import { AccountMembershipsLoader } from '../loaders/account_memberships_loader'
import { UsersLoader } from '../loaders/users_loader'

export const resolvers = {
  Query: {
    accounts: (_, __, { user }) => {
      return user.getAccounts()
    }
  },

  Mutation: {
    async createAccount (_, { input }, { user }) {
      const { account } = await new CreateAccount(user, input).call()

      return account
    },

    async updateAccount (_, { id, input }, { user }) {
      const account = await Account.findByPk(id)
      if (!account) return

      // TODO: Check user permissions

      await new UpdateAccount(account, input).call()

      return account
    }
  },

  Membership: {
    async user (membership, _, context) {
      return UsersLoader.preload(membership.userId, context)
    }
  },

  Account: {
    async memberships (account, _, context) {
      return AccountMembershipsLoader.preload(account.id, context)
    }
  }
}
