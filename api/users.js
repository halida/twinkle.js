import { User } from '../models/user'
import { UpdateUser } from '../services/users/update'

export const resolvers = {
  Query: {
    user: (_, { id }) => {
      return User.findByPk(id)
    },

    users: () => {
      return User.findAll()
    }
  },

  Mutation: {
    async updateUser (_, { id, input }) {
      const user = await User.findByPk(id)

      if (!user) return

      await new UpdateUser(user, input).call()

      return user
    }
  }
}
