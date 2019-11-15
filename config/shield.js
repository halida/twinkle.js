import { rule } from 'graphql-shield'

export { allow } from 'graphql-shield'

export const isAuthorized = rule({ cache: 'contextual' })(
  (parent, args, { user }) => !!user
)

export const isAdmin = rule({ cache: 'contextual' })(
  (parent, args, { user }) => user && user.role === 'admin'
)
