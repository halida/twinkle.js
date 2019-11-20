import { Account } from '../models/account'
import { CreateAccount } from '../services/accounts/create'
import { UpdateAccount } from '../services/accounts/update'

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

      await new UpdateAccount(account, input).call()

      return account
    }
  }
}
