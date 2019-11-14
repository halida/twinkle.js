export async function up (queryInterface, Sequelize) {
  await queryInterface.addColumn(
    'users',
    'role',
    { type: Sequelize.ENUM('admin', 'member'), allowNull: false, defaultValue: 'member' }
  )
}

export async function down (queryInterface) {
  await queryInterface.removeColumn('users', 'role')

  await queryInterface.sequelize.query('DROP TYPE enum_users_role')
}
