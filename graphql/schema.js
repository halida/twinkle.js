export const typeDefs = `
   type Query {
       sayHello(name: String!): String!
   }

   type Mutation {
       sayHello(name: String!): String!
   }
`

// Define resolvers map for API definitions in SDL
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
