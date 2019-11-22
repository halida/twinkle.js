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
