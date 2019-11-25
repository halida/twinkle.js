import { CreateAccount } from '../../services/accounts/create'
import { UpdateAccount } from '../../services/accounts/update'
import { DeleteAccount } from '../../services/accounts/delete'
import { AccountMembershipsLoader } from '../../loaders/account_memberships_loader'
import { UsersLoader } from '../../loaders/users_loader'

export const resolvers = {
  Query: {
    accounts: (_, __, { user, transaction }) => {
      return user.getAccounts({ transaction: context.transaction })
    }
  },

  Mutation: {
    async createAccount (_, { input }, { user, transaction }) {
      const { account } = await new CreateAccount(user, input, { transaction }).call()
      return account
    },

    async updateAccount (_, { input }, { account, transaction }) {
      await new UpdateAccount(account, input, { transaction }).call()

      return account
    },

    async deleteAccount (_, { input }, { account, transaction }) {
      await new DeleteAccount(account, { transaction }).call()
      return account.id
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
