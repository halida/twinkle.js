export async function up (queryInterface, Sequelize) {
  await queryInterface.sequelize.transaction(async function (transaction) {
    await queryInterface.createTable('accounts', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: false }
    }, { transaction })

    await queryInterface.addIndex('accounts', {
      name: 'accounts_name',
      unique: true,
      fields: [Sequelize.fn('lower', Sequelize.col('name'))],
      transaction
    })
  })
}

export async function down (queryInterface) {
  await queryInterface.sequelize.transaction(async function (transaction) {
    await queryInterface.dropTable('accounts', { transaction })
  })
}
