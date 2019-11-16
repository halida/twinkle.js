export async function up (queryInterface, Sequelize) {
  await queryInterface.addColumn(
    'users',
    'password',
    { type: Sequelize.STRING, allowNull: true }
  )
}

export async function down (queryInterface) {
  await queryInterface.removeColumn('users', 'password')
}
