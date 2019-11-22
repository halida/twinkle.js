import { allow, deny } from 'graphql-shield'

export const permissions = {
  Query: {
    '*': deny,
    sayHello: allow
  },

  Mutation: {
    '*': deny,
    sayHello: allow
  }
}
