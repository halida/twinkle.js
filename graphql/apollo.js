import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa'
import { typeDefs, resolvers } from './schema.js'

const schema = makeExecutableSchema({ typeDefs, resolvers })
export const apolloServer = new ApolloServer({ schema })
