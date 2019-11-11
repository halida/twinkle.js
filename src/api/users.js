import { gql } from 'apollo-server-core'
import { User } from '../models/user.js'

export const typeDefs = gql`
    extend type Query {
        user(id: ID!): User
        users: [User!]!
    }

    type User {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        email: String!
        login: String!
    }
`

export const resolvers = {
  Query: {
    user: (obj, args, context, info) => {
      return User.findByPk(args.id)
    },

    users: (obj, args, context, info) => {
      return User.findAll()
    }
  }
}
