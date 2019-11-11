import { gql } from 'apollo-server-core'

export const typeDefs = gql`
    scalar Date
    scalar Time
    scalar DateTime

    type Query {
        sayHello(name: String!): String!
    }

    type Mutation {
        sayHello(name: String!): String!
    }
`

export const resolvers = {
  Query: {
    sayHello: (obj, args, context, info) => {
      return `Hello ${args.name}!`
    }
  },

  Mutation: {
    sayHello: (obj, args, context, info) => {
      return `Hello ${args.name}!`
    }
  }
}
