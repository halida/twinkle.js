import { ApolloServer, makeExecutableSchema } from 'apollo-server-koa'
import { typeDefs, resolvers } from '../api/schema.js'

const schema = makeExecutableSchema({ typeDefs, resolvers })
export const apolloServer = new ApolloServer({ schema })
