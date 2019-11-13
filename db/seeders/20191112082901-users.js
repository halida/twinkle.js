import { User } from '../../models/user.js'

export async function up (queryInterface, Sequelize) {
  await User.create({
    email: 'admin@twinkle.test',
    login: 'admin'
  })
}

export async function down (queryInterface, Sequelize) {
  const user = await User.findOne({ where: { login: 'admin' } })
  await user.destroy()
}
