import { User } from '../../models/user'
import { CreateUser } from '../../services/users/create'

export async function up (queryInterface, Sequelize) {
  await new CreateUser({
    role: 'admin',
    login: 'admin',
    email: 'admin@twinkle.test',
    password: 'password',
    passwordConfirmation: 'password'
  }).call()

  await new CreateUser({
    role: 'member',
    login: 'john',
    email: 'john@twinkle.test',
    password: 'password',
    passwordConfirmation: 'password'
  }).call()

  await new CreateUser({
    role: 'member',
    login: 'amanda',
    email: 'amanda@twinkle.test',
    password: 'password',
    passwordConfirmation: 'password'
  }).call()
}

export async function down (queryInterface, Sequelize) {
  await User.findOne({ where: { login: 'admin' } }).then(user => user.destroy())
  await User.findOne({ where: { login: 'john' } }).then(user => user.destroy())
}
