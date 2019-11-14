import { gql } from 'apollo-server-core'
import { User } from '../models/user.js'
import _ from 'lodash'

export const typeDefs = gql`
    type User {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        email: String!
        login: String!
    }

    input UpdateUserInput {
        email: String
        login: String
    }

    type updateUserPayload {
        user: User,
        errors: [ValidationError!]
    }

    extend type Query {
        user(id: ID!): User
        users: [User!]!
    }

    extend type Mutation {
        updateUser(id: ID!, input: UpdateUserInput!): updateUserPayload
    }
`

export const resolvers = {
  Query: {
    user: (obj, args) => {
      return User.findByPk(args.id)
    },

    users: () => {
      return User.findAll()
    }
  },

  Mutation: {
    async updateUser (obj, args) {
      const user = await User.findByPk(args.id)

      if (!user) return

      try {
        await user.update(_.pick(args.input, 'email', 'login'))
      } catch (e) {
        if (e.name = 'ValidationError') {
          return { errors: e.errors }
        } else {
          throw e
        }
      }

      return { user: user }
    }
  }
}
