import { rule } from 'graphql-shield'

export { allow } from 'graphql-shield'

export const isAuthorized = rule({ cache: 'contextual' })(
  (parent, args, { userPayload }) => !!userPayload
)

export const isAdmin = rule({ cache: 'contextual' })(
  (parent, args, { userPayload }) => userPayload && userPayload.role === 'admin'
)
