import faker from 'faker'
import { Factory } from 'rosie'
import { Account } from '../../models'

Factory
  .define('account')
  .attrs({
    name: () => faker.company.companyName()
  })
  .option('owner', null)
  .after((attrs, options) => {
    if (options.owner) {
      attrs.Memberships = [{ userId: options.owner.id }]
    }

    return new Account(attrs, { include: { all: true } })
  })
