import { allow, isAuthorized } from '../config/shield'

export const permissions = {
  Query: {
    '*': isAuthorized,
    sayHello: allow
  },

  Mutation: {
    '*': isAuthorized,
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
