import { UpdateUser } from '../../services/users/update'

export const resolvers = {
  Mutation: {
    async updateProfile (_, { input }, { user, transaction }) {
      await new UpdateUser(user, input, { transaction }).call()

      return user
    }
  }
}
