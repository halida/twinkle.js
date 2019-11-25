import { User } from '../../models'
import { AuthenticateUser } from '../../services/users/authenticate'
import { CreateUser } from '../../services/users/create'

export const resolvers = {
  Query: {
    currentUser: (_, __, { user }) => {
      return user
    }
  },

  Mutation: {
    async login (_, { input }, { transaction }) {
      const { login, password } = input
      const user = await User.findOne({ where: { login }, transaction })
      if (!user) return

      const token = await new AuthenticateUser({ user, password }).call()
      if (token) return { user, token }
    },

    async signup (_, { input }, { transaction }) {
      const user = await new CreateUser(input, { transaction }).call()
      if (user) return user
    }
  }
}
