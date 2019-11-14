import { gql } from 'apollo-server-core'

export const typeDefs = gql`
    scalar Date
    scalar Time
    scalar DateTime
    scalar JSONString

    type ValidationError {
        message: String
        path: String
        validatorName: String
    }

    type Query {
        sayHello(name: String!): String!
    }

    type Mutation {
        sayHello(name: String!): String!
    }
`

export const resolvers = {
  Query: {
    sayHello: (obj, args) => {
      return `Hello ${args.name}!`
    }
  },

  Mutation: {
    sayHello: (obj, args) => {
      return `Hello ${args.name}!`
    }
  }
}
