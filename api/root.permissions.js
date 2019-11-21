import { rule, allow, chain } from 'graphql-shield'
import { User } from '../models'

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_, __, context) => {
    if (context.authPayload) context.user = await User.findByPk(context.authPayload.id)
    return !!context.user
  }
)

export const isMember = rule({ cache: 'contextual' })(
  (parent, args, { user }) => user && user.role === 'member'
)

export const isAuthenticatedMember = chain(isAuthenticated, isMember)

export const permissions = {
  Query: {
    '*': isAuthenticatedMember,
    sayHello: allow
  },

  Mutation: {
    '*': isAuthenticatedMember,
    sayHello: allow
  }
}
