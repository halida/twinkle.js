import { allow } from '../config/shield'
import { User } from '../models/user'
import { AuthenticateUser } from '../services/users/authenticate'
import { CreateUser } from '../services/users/create'

export const permissions = {
  Mutation: {
    login: allow,
    signup: allow
  }
}

export const resolvers = {
  Query: {
    currentUser: (_, __, { userPayload }) => {
      return User.findByPk(userPayload.id)
    }
  },

  Mutation: {
    async login (_, { input }) {
      const { login, password } = input
      const user = await User.findOne({ where: { login } })
      if (!user) return

      const token = await new AuthenticateUser({ user, password }).call()
      if (token) return { user, token }
    },

    async signup (_, { input }) {
      const user = await new CreateUser(input).call()
      if (user) return user
    }
  }
}
