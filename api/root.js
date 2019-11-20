import { allow, isMember } from '../config/shield'

export const permissions = {
  Query: {
    '*': isMember,
    sayHello: allow
  },

  Mutation: {
    '*': isMember,
    sayHello: allow
  }
}

export const resolvers = {
  Query: {
    sayHello: (_, { name }) => {
      return `Hello ${name}!`
    }
  },

  Mutation: {
    sayHello: (_, { name }) => {
      return `Hello ${name}!`
    }
  }
}
