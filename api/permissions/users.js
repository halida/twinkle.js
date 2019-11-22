import { isAuthenticated } from './auth'

export const permissions = {
  Mutation: {
    updateProfile: isAuthenticated
  }
}
