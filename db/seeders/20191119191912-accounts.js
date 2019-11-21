import { User } from '../../models/user'
import { Account } from '../../models/account'
import { CreateAccount } from '../../services/accounts/create'
import { JoinAccount } from '../../services/accounts/join'

export async function up (queryInterface, Sequelize) {
  const john = await User.findOne({ where: { login: 'john' } })
  const amanda = await User.findOne({ where: { login: 'amanda' } })

  const { account } = await new CreateAccount(john, {
    name: 'Rocket Lab',
    owner: john
  }).call()

  await new JoinAccount(account, amanda).call()
}

export async function down (queryInterface, Sequelize) {
  await Account.findOne({ where: { name: 'Rocket Lab' } }).then(account => account.destroy())
}
