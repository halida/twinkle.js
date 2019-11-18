import faker from 'faker'
import { Factory } from 'rosie'
import { User } from '../../models/user'

export const member = Factory
  .define('member', User)
  .attrs({
    role: 'member',
    login: () => faker.random.alphaNumeric(10),
    email: () => faker.internet.email()
  })

export const admin = Factory
  .define('admin')
  .extend('member')
  .attrs({
    role: 'admin'
  })
