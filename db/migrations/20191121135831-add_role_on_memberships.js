export async function up (queryInterface, Sequelize) {
  await queryInterface.addColumn(
    'memberships',
    'role',
    { type: Sequelize.ENUM('owner', 'admin', 'user', 'viewer'), allowNull: false, defaultValue: 'user' }
  )
}

export async function down (queryInterface) {
  await queryInterface.removeColumn('memberships', 'role')

  await queryInterface.sequelize.query('DROP TYPE enum_memberships_role')
}
