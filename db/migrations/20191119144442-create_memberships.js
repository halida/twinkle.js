export async function up (queryInterface, Sequelize) {
  await queryInterface.sequelize.transaction(async function (transaction) {
    await queryInterface.createTable('memberships', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
      userId: { type: Sequelize.BIGINT, allowNull: false },
      accountId: { type: Sequelize.BIGINT, allowNull: false }
    }, { transaction })

    await queryInterface.addIndex('memberships', ['userId', 'accountId'], { unique: true, transaction })
    await queryInterface.addIndex('memberships', ['accountId'], { transaction })

    await queryInterface.addConstraint('memberships', ['userId'], {
      type: 'foreign key',
      references: { table: 'users', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'restrict',
      transaction
    })

    await queryInterface.addConstraint('memberships', ['accountId'], {
      type: 'foreign key',
      references: { table: 'accounts', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'restrict',
      transaction
    })
  })
}

export async function down (queryInterface) {
  await queryInterface.sequelize.transaction(async function (transaction) {
    await queryInterface.dropTable('memberships', { transaction })
  })
}
