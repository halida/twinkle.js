import faker from 'faker'
import { Factory } from 'rosie'
import { User } from '../../models'

Factory
  .define('member', User)
  .attrs({
    role: 'member',
    login: () => faker.random.alphaNumeric(10),
    email: () => faker.internet.email()
  })

Factory
  .define('admin')
  .extend('member')
  .attrs({
    role: 'admin'
  })
