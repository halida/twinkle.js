import { User } from '../../models/user'
import { Account } from '../../models/account'
import { CreateAccount } from '../../services/accounts/create'

export async function up (queryInterface, Sequelize) {
  const john = await User.findOne({ where: { login: 'john' } })

  await new CreateAccount({
    name: 'Rocket Lab',
    owner: john
  }).call()
}

export async function down (queryInterface, Sequelize) {
  await Account.findOne({ where: { name: 'Rocket Lab' } }).then(account => account.destroy())
}
