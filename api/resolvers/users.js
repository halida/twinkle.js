import { UpdateUser } from '../../services/users/update'

export const resolvers = {
  Mutation: {
    async updateProfile (_, { input }, { user }) {
      await new UpdateUser(user, input).call()

      return user
    }
  }
}
